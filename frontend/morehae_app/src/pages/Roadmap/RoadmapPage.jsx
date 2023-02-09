import { useState } from "react";
import {useSearchParams} from "react-router-dom";

import Modal from "@/components/Modal/Modal";
import WhatWhy from "@/components/Modal/WhatWhy";
import Links from "@/components/Modal/Links";
import Review from "@/components/Modal/Review";
import Dropdown from "@/components/Dropdown/Dropdown";
import HttpWithURL from "@/utils/http";

import { useEffect } from "react";
import ReactFlowRoadmap from "@/components/Roadmap/ReactFlowRoadmap";

const RoadmapPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 모달 관련 state
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(null);


  // 로드맵 상세 모달 데이터 가져오기
  const loadNodeDetail = async (id) => {
    // setNodeId(() => id);
    // console.log(check);
    await HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`node/${id}`)
      .then((res) => setReqData(() => res.data));
    setShowModal(() => !showModal);
  };

  // Component 첫 Rendering시 Initialize
  // 1. 메인 노드들 Elkjs를 이용해 위치 계산
  // 2. 각 메인 노드 및 해당 메인 노드에 연결된 서브 노드
  useEffect(()=>{
    // QueryString에 nodeId 값 있을 경우 ( 마이페이지에서 노드 버튼 눌러서 넘어온 경우 )
    // 해당 Node Id를 갖는 노드에 대한 모달 띄움.
    if(searchParams.get("nodeId")){
      loadNodeDetail(searchParams.get("nodeId"));
    }
  }, [searchParams])
  return (
    <div className="bg-dark">
      <div className="w-screen h-screen">
        <ReactFlowRoadmap
          loadNodeDetail={loadNodeDetail}
        />
        <Modal
          id={reqData.id}
          data={reqData}
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="">
            <div className=" rounded-lg">
              <WhatWhy reqData={reqData} nodeId={nodeId} />
              <Links reqData={reqData} />
              <Review reqData={reqData} nodeId={nodeId} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default RoadmapPage;

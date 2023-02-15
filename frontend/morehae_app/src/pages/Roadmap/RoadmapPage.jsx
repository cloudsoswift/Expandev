import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "@/components/Modal/Modal";
import WhatWhy from "@/components/Modal/WhatWhy";
import Links from "@/components/Modal/Links";
import Review from "@/components/Modal/Review";
import ReactFlowRoadmap from "@/components/Roadmap/ReactFlowRoadmap";

import HttpWithURL from "@/utils/http";

import { GiRingedPlanet } from "react-icons/gi";

const RoadmapPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 모달 관련 state
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(null);

  // 로드맵 상세 모달 데이터 가져오기
  const loadNodeDetail = async (id) => {
    setNodeId(() => id);
    // console.log(check);
    await HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`node/${id}`)
      .then((res) => setReqData(() => res.data));
    setShowModal(() => !showModal);
  };

  useEffect(() => {
    if (searchParams?.get("nodeId")) {
      loadNodeDetail(searchParams.get("nodeId"));
    }
  }, [searchParams]);

  // Component 첫 Rendering시 Initialize
  // 1. 메인 노드들 Elkjs를 이용해 위치 계산
  // 2. 각 메인 노드 및 해당 메인 노드에 연결된 서브 노드
  useEffect(() => {
    // QueryString에 nodeId 값 있을 경우 ( 마이페이지에서 노드 버튼 눌러서 넘어온 경우 )
    // 해당 Node Id를 갖는 노드에 대한 모달 띄움.
    if (searchParams.get("nodeId")) {
      loadNodeDetail(searchParams.get("nodeId"));
    }
  }, [searchParams]);

  const [checkbox, setCheckbox] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const userInfo = useSelector((state) => state.user.user);
  let navigate = useNavigate();

  const handleCheckbox = () => {
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(`node/${nodeId}/clear`, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleWritePost = () => {
    if (!userInfo?.nickname) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/blog/write");
    }
  };

  useEffect(() => {
    // 리액트 인풋 관련 에러-Warning: A component is changing an uncontrolled input to be controlled.
    // 해결은 삼항연산자로 값이 없을 경우 false로
    setCheckbox(reqData?.isComplete ? true : false);
  }, [reqData.isComplete]);

  useEffect(() => {
    if (userInfo?.nickname) {
      setShowCheckbox(true);
    }
  }, [userInfo]);

  return (
    <div className="bg-dark">
      <div className="w-screen h-[calc(100vh-80px)]">
        <ReactFlowRoadmap loadNodeDetail={loadNodeDetail} />
        <Modal
          id={reqData.id}
          data={reqData}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="">
            <div className="rounded-lg ">
              <div className="sticky top-0 z-30 h-[81px] w-[600px] drop-shadow-lg bg-[rgb(48,54,61)] px-4 py-[1.6rem] border-b ">
                <div className=" flex justify-between mx-1">
                  <div className="flex ">
                    <div className="flex text-xl font-semibold mr-3 text-white">
                      <GiRingedPlanet className="mt-0.5 mr-1 text-2xl" />
                      {reqData.title}
                    </div>
                    <div
                      onClick={handleWritePost}
                      className="bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] px-3 py-1 rounded-full text-xs font-bold  text-green-400 drop-shadow-md border-2 border-green-400 ease-in-out duration-300"
                    >
                      POST
                    </div>
                  </div>
                  {showCheckbox ? (
                    <>
                      <input
                        className="w-5 h-5 mx-2 mt-1 text-black"
                        type="checkbox"
                        onClick={handleCheckbox}
                        onChange={(e) => setCheckbox()}
                        checked={checkbox}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex justify-end"></div>
                {/* <div className="w-full h-[0.05rem] bg-gradient-to-r from-cyan-500 to-blue-500"></div> */}
              
              </div>
              <Links reqData={reqData} />
              <WhatWhy reqData={reqData} nodeId={nodeId} />
              <Review reqData={reqData} nodeId={nodeId} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default RoadmapPage;

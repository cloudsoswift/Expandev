import { useCallback, useState } from "react";


import Modal from "@/components/Modal/Modal";
import WhatWhy from "@/components/Modal/WhatWhy";
import Links from "@/components/Modal/Links";
import Review from "@/components/Modal/Review";
import Dropdown from "@/components/Dropdown/Dropdown";
import HttpWithURL from "@/utils/http";

import { useEffect } from "react";
import Rooadmap from "@/components/Roadmap/ReactFlowRoadmap";



const RoadmapPage = () => {


  // 모달 관련 state
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  const [check, setCheck] = useState(false);

  const [checkbox, setCheckbox] = useState(false);

  /* 드롭다운 메뉴 관련 state들 */
  const [role, setRole] = useState({ id: 0, content: "포지션을 선택해주세요" }); // 직군
  const [situation, setSituation] = useState({
    id: 1,
    content: "상황을 선택해주세요",
  }); // 상황
  const [roleList, setRoleList] = useState([
    // 직군 리스트
    { id: 0, content: "포지션을 선택해주세요" },
  ]);
  const [situationList, setSituationList] = useState([
    // 상황 리스트
    { id: 1, content: "상황을 선택해주세요" },
  ]);
  /* 로드맵 관련 state들 */
  const [nodesDataList, setNodesDataList] = useState({});

  // 직군 리스트 가져오기
  const getRoleList = () => {
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get("roles")
      .then((Response) => {
        setRoleList((oldState) => {
          return Response.data;
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  // 상황 리스트 가져오기
  const getSituationList = (role) => {
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`roles/${role.id}`)
      .then((Response) => {
        setSituationList((oldState) => {
          return Response.data;
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  // 로드맵 상세 모달 데이터 가져오기
  const loadNodeDetail = (id) => {
    setNodeId(() => id);
    console.log(check);
    setCheck((prevCheck) => !prevCheck);
  };
  // 노드 데이터 가져오기?
  const getData = useCallback(async () => {
    await HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`node/${nodeId}`)
      .then((res) => setReqData(res.data));
    // fetch 썼을 때
    // const res = await fetch(
    //   `http://i8d212.p.ssafy.io:8000/roadmaps/node/${nodeId}`
    // ).then((res) => res.json());
    // setReqData(res);

    setShowModal(() => !showModal);
    // eslint-disable-next-line
  }, [check]);

  useEffect(() => {
    getData();
  }, [getData]);

  // 페이지가 로딩될 때 직군 리스트를 가져온다
  useEffect(() => {
    getRoleList();
  }, []);

  // 직군 선택될 때마다 상황 리스트를 가져온다
  useEffect(() => {
    console.log("role 선택됨:", role);
    getSituationList(role);
  }, [role]);

  // 상황 선택될 때마다 로드맵 데이터를 가져온다
  useEffect(()=>{
    const getRoadMap = async () => {
      const response = await HttpWithURL(process.env.REACT_APP_ROADMAP_URL).get(
        `track/${role?.id ? role.id : 1}`
      );
      setNodesDataList(response.data);
    };
    getRoadMap();
  }, [role])

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };
  // Component 첫 Rendering시 Initialize
  // 1. 메인 노드들 Elkjs를 이용해 위치 계산
  // 2. 각 메인 노드 및 해당 메인 노드에 연결된 서브 노드

  return (
    <div className="w-screen h-screen">
      {/* 드롭다운 컴포넌트들 */}
      <div className="flex justify-center">
        <div className="w-96 mr-2">
          <Dropdown
            items={roleList}
            selectedItem={role}
            setSelectedItem={setRole}
          />
        </div>
        <div className="w-96 ml-2">
          <Dropdown
            items={situationList}
            selectedItem={situation}
            setSelectedItem={setSituation}
          />
        </div>
      </div>
      <Rooadmap nodesDataList={nodesDataList} loadNodeDetail={loadNodeDetail}/>
      <Modal
        id={reqData.id}
        data={reqData}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="p-6">
          <div className=" flex justify-between">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              {reqData.title}
            </h3>
            <input
              className="w-5 h-5 ml-2"
              type="checkbox"
              onClick={handleCheckbox}
            />
          </div>
          <div className="justify-items-end">
            <button className=" bg-blue-200 px-3 py-1 rounded text-xs">
              POST
            </button>
          </div>
          <WhatWhy reqData={reqData} />
          <Links reqData={reqData} />
          <Review reqData={reqData} nodeId={nodeId} />
        </div>
      </Modal>
    </div>
  );
};
export default RoadmapPage;

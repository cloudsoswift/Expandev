import React, { useEffect, useState, useCallback } from "react";

import Modal from "@/components/Modal/Modal";
import WhatWhy from "@/components/Modal/WhatWhy";
import Links from "@/components/Modal/Links";
import Review from "@/components/Modal/Review";
import Dropdown from "@/components/Dropdown/Dropdown";
import Roadmap from "@/components/Roadmap/Roadmap";
// import nodesDataJSON from ".././nodesDataJSON.json"

import axios from 'axios'

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  const [check, setCheck] = useState(false);

  const [checkbox, setCheckbox] = useState(false);

  /* 드롭다운 메뉴 관련 state들 */
  const [role, setRole] = useState({id: 0, content: "포지션을 선택해주세요"})  // 직군
  const [situation, setSituation] = useState({id: 1, content: "상황을 선택해주세요"})  // 상황
  const [roleList, setRoleList] = useState([  // 직군 리스트
    { id: 0, content: "포지션을 선택해주세요" },
  ]);
  const [situationList, setSituationList] = useState([  // 상황 리스트
    { id: 1, content: "상황을 선택해주세요" },
  ]);

  /* 로드맵 관련 state들 */
  const [nodesDataJSON, setNodesDataJSON] = useState({
    id: 1,
    nodesData: [],
  });

  const handleClickButton = (id) => {
    setNodeId(() => id);
    setCheck(!check);
  };

  // 직군 리스트 가져오기
  const getRoleList = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roadmaps/roles`)
      .then((Response) => {
        setRoleList((oldState) => {
          return Response.data;
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  // 상황 리스트 가져오기
  const getSituationList = (role) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roadmaps/roles/${role.id}`)
      .then((Response) => {
        setSituationList((oldState) => {
          return Response.data;
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  const getRoadmap = (situation) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roadmaps/track/${situation.id}`)
      .then((Response) => {
        setNodesDataJSON((oldState) => {
          return Response.data;
        });
      })
      .catch((Error) => {
        console.log(Error);
        setNodesDataJSON((oldState) => {
          return Response.data;
        });
      });
  }

  // 로드맵 상세 모달 데이터 가져오기
  const getData = useCallback(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/roadmaps/node/${nodeId}`
    ).then((res) => res.json());

    setReqData(res);
    setShowModal(() => !showModal);
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
  }, [role])

  // 상황 선택될 때마다 로드맵 데이터를 가져온다
  useEffect(() => {
    console.log("situation 선택됨:", situation);
    getRoadmap(situation);
  }, [situation])

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <>
      <div className="p-10">
        {/* 드롭다운 컴포넌트들 */}
        <div className="flex justify-center">
          <div className="w-96 mr-2">
            <Dropdown items={roleList} selectedItem={role} setSelectedItem={setRole}/>
          </div>
          <div className="w-96 ml-2">
            <Dropdown items={situationList} selectedItem={situation} setSelectedItem={setSituation}/>
          </div>
        </div>

        {/* 로드맵 컴포넌트*/}
        <Roadmap
          nodesDataJSON={nodesDataJSON}
          handleClickButton={handleClickButton}
        />

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
            <Review reqData={reqData} nodeId={nodeId}/>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;

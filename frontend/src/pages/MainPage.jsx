import React, { useEffect, useState } from "react";

import Modal from "../components/Modal";
import WhatWhy from "../components/WhatWhy";
import Links from "../components/Links";
import Review from "../components/Review";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(1);

  const [checkbox, setCheckbox] = useState(false)

  // API 받아오기
  const getData = async () => {
    const res = await fetch(
      `https://ssekerapi.site/roadmaps/${nodeId}/node`
    ).then((res) => res.json());
    const initData = res;
    setReqData(initData);
  };

  // button id에 따라서 값 변경
  const handleClickButton = (e) => {
    const { id } = e.target;
    setNodeId(id);
    setShowModal(!showModal);
  };

  // nodeId가 변할 때 마다 렌더링
  useEffect(() => {
    getData();
  }, [nodeId]);

  const handleCheckbox = ()=> {
    setCheckbox(!checkbox)
  }

  return (
    <>
      <div className="p-10 ">
        <h1 className="text-3xl mb-5">Main Page</h1>
        <button
          id="1"
          className="cursor-pointer bg-blue-600 hover:bg-blue-800 focus:outline-none px-5 py-2 rounded-md font-medium text-sm text-white mr-5"
          onClick={handleClickButton}
        >
          Node1
        </button>
        <button
          id="3"
          className="cursor-pointer bg-blue-600 hover:bg-blue-800 focus:outline-none px-5 py-2 rounded-md font-medium text-sm text-white mr-5"
          onClick={handleClickButton}
        >
          Node3
        </button>
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
              <input className="w-5 h-5 ml-2" type="checkbox" onClick={handleCheckbox}/>
            </div>
            <div className="justify-items-end">
              <button className=" bg-blue-200 px-3 py-1 rounded text-xs">
                POST
              </button>
            </div>
            <WhatWhy reqData={reqData} />
            <Links reqData={reqData} />
            <Review reqData={reqData} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;

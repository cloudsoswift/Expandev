import React, { useEffect, useState, useCallback } from "react";

import Modal from "@/components/Modal/Modal";
import WhatWhy from "@/components/Modal/WhatWhy";
import Links from "@/components/Modal/Links";
import Review from "@/components/Modal/Review";

import RoadmapPage from "@/pages/RoadmapPage";



const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [reqData, setReqData] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  const [check, setCheck] = useState(false);

  const [checkbox, setCheckbox] = useState(false);

  const handleClickButton = (id) => {
    // const { id } = e.target;
    setNodeId(() => id);
    setCheck(!check);
  };


  const getData = useCallback(async () => {
    const res = await fetch(
      `https://ssekerapi.site/roadmaps/node/${nodeId}`
    ).then((res) => res.json());

    setReqData(res);
    setShowModal(() => !showModal);
    // eslint-disable-next-line
  }, [check]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };



  return (
    <>
      <div className="p-10 ">
      <RoadmapPage handleClickButton={handleClickButton} />
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
            <div className="flex justify-end">
              <button className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs">
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

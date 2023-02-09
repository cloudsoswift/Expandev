import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HttpWithURL from "@/utils/http";

import { GiRingedPlanet } from "react-icons/gi";

const WhatWhy = ({ reqData, nodeId }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const userInfo = useSelector((state) => state.user.user);
  let navigate = useNavigate()

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
    setCheckbox(reqData.isComplete);
  }, [reqData.isComplete]);

  useEffect(() => {
    if (userInfo?.nickname) {
      setShowCheckbox(true);
    }
  }, [userInfo]);

  return (
    <div>
      <div className="drop-shadow-lg bg-[rgb(48,54,61)] p-6 mb-3 border-b">
        <div className=" flex justify-between">
          <div className="flex">
            <div className="flex text-xl font-semibold mr-3 text-white">
              <GiRingedPlanet className="mt-0.5 mr-1 text-2xl" />
              {reqData.title}
            </div>
            <div
              onClick={handleWritePost}
              className="bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] px-3 py-1 rounded-full text-xs font-bold text-[rgb(131,132,139)] hover:text-green-500 drop-shadow-md border-2 border-[rgb(131,132,139)] hover:border-green-500"
            >
              POST
            </div>
          </div>
          {showCheckbox ? (
            <input
              className="w-5 h-5 ml-2 mt-1 text-black"
              type="checkbox"
              onClick={handleCheckbox}
              onChange={(e) => setCheckbox()}
              checked={checkbox}
            />
          ) : <></>}
        </div>
        <div className="flex justify-end"></div>
      </div>
      <div className="mx-3 p-3">
        <div className="my-5">
          <h2 className="text-xl mb-3 text-white ">WHAT</h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words ">
            {reqData.content}
            dladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldml
          </p>

          <h2 className="text-xl mb-3 text-white">WHY</h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words ">
            {reqData.purpose}
            dladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldml
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhy;

import React from "react";
import { IoIosRocket } from "react-icons/io";

const WhatWhy = ({ reqData, handleCheckbox }) => {
  return (
    <div>
      <div className="drop-shadow-lg bg-[rgb(48,54,61)] p-6 mb-3 border-b">
        <div className=" flex justify-between">
          <div className="flex">
            <div className="flex text-xl font-semibold mr-3 text-white">
              <IoIosRocket className="mt-0.5 mr-1 text-2xl" />
              {reqData.title}
            </div>
            <button className=" bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] px-3 py-1 rounded-full text-xs font-bold text-[rgb(131,132,139)] hover:text-white drop-shadow-md">
              POST
            </button>
          </div>
          <input
            className="w-5 h-5 ml-2 mt-1 text-black"
            type="checkbox"
            onClick={handleCheckbox}
          />
        </div>
        <div className="flex justify-end"></div>
      </div>
      <div className="mx-3 p-3">
        <div className="my-5">
          <h2 className="text-md mb-3 text-white underline underline-offset-8">
            WHAT
          </h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words hover:text-white">
            {/* {reqData.content} */}
            dladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldml
          </p>

          <h2 className="text-md mb-3 text-white underline underline-offset-8">
            WHY
          </h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words hover:text-white">
            {/* {reqData.purpose} */}
            dladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldmldladmldldml
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhy;

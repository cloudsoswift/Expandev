import { VscRepo } from "react-icons/vsc";

const WhatWhy = ({ reqData }) => {
  return (
    <div className="z-20">
      <div className="mx-3 p-3 bg-[rgb(48,54,61)] rounded-lg border-mbc border-4 border-double">
        <div className=" ">
          <div className="flex">
            <VscRepo className="mt-1 mr-2 text-lg" />
            <h2 className="text-md mb-3 text-white ">WHAT</h2>
          </div>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words text-sm">
            {reqData.content ? reqData?.content : "해당 데이터가 없습니다"}
          </p>
          <div className="flex">
            <VscRepo className="mt-1 mr-2 text-lg" />
            <h2 className="text-md mb-3 text-white">WHY</h2>
          </div>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words text-sm">
            {reqData.purpose ? reqData?.purpose : "해당 데이터가 없습니다"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhy;

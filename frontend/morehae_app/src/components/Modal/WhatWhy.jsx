const WhatWhy = ({ reqData }) => {
  return (
    <div className="z-20">
      <div className="mt-3 mx-3 px-3 py-1 bg-[rgb(48,54,61)] rounded-lg ">
        <div className="my-5 ">
          <h2 className="text-xl mb-3 text-white ">WHAT</h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words text-sm">
            {reqData.content ? reqData?.content : "해당 데이터가 없습니다"}
          </p>

          <h2 className="text-xl mb-3 text-white">WHY</h2>
          <p className="mb-5 font-normal text-[rgb(191,192,194)] break-words text-sm">
            {reqData.purpose ? reqData?.purpose : "해당 데이터가 없습니다"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhy;

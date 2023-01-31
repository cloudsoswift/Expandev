import React from "react";

const WhatWhy = ({reqData}) => {
  return (
    <div className="my-5">
      <h3 className="text-md my-1">WHAT</h3>
      <p className="mb-5 font-normal text-gray-700">
        {reqData.content}
      </p>
      <hr />
      <h3 className="text-md my-1">WHY</h3>
      <p className="mb-5 font-normal text-gray-700">
        {reqData.purpose}
      </p>
      <hr />
    </div>
  );
};

export default WhatWhy;

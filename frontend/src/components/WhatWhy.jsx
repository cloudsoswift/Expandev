import React from "react";

const WhatWhy = ({reqData}) => {
  return (
    <>
      <h3 className="text-md mb-2">WHAT</h3>
      <p className="mb-5 font-normal text-gray-500">
        {reqData.content}
      </p>
      <h3 className="text-md mb-2">WHY</h3>
      <p className="mb-5 font-normal text-gray-500">
        {reqData.purpose}
      </p>
    </>
  );
};

export default WhatWhy;

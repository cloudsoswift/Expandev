import React from "react";

const WhatWhy = ({data}) => {
  return (
    <>
      <h3 className="text-md mb-2">WHAT</h3>
      <p className="mb-5 font-normal text-gray-500">
        {data.content}
      </p>
      <h3 className="text-md mb-2">WHY</h3>
      <p className="mb-5 font-normal text-gray-500">
        {data.purpose}
        
        
      </p>
    </>
  );
};

export default WhatWhy;

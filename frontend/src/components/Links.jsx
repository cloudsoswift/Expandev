import React from "react";
import Carousel from "./Carousel";

const Links = () => {
  return (
    <div>
      <div>
        <div className=" flex justify-between">
          <h2>Blog</h2>
          <button className="bg-blue-200 px-3 py-1 rounded text-xs">
            more..
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3">
          <div className="bg-blue-100 w-36 h-36">01</div>
          <div className="bg-blue-100 w-36 h-36">02</div>
          <div className="bg-blue-100 w-36 h-36">03</div>
        </div>
      </div>
      <div>
        <h2>Interview</h2>
        <Carousel />
      </div>
      <div>
        <h2>R Contents</h2>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3">
          <div className="bg-blue-100 w-36 h-36">01</div>
          <div className="bg-blue-100 w-36 h-36">02</div>
          <div className="bg-blue-100 w-36 h-36">03</div>
        </div>
      </div>
    </div>
  );
};

export default Links;

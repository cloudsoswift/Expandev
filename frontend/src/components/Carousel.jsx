import React, { useState } from "react";
import { data } from "./mockData";


const Carousel = () => {
  // const [currentIdx, setCurrentIdx] = useState(0);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 495;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 495;
  };

  // const gotoSlide = (slideIdx) => {
  //   console.log(slideIdx);
  //   setCurrentIdx(slideIdx);
  // };
  return (
    <>
      <div className="relative flex items-center">
        <div
          onClick={slideLeft}
          className="text-lg opacity-50 cursor-pointer hover:opacity-100p"
        >
          {"<"}
        </div>
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {data.map((item, slideIdx) => (
            <img
              key={slideIdx}
              className="w-[165px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
              src={item.img}
              alt="/"
            />
          ))}
        </div>
        <div onClick={slideRight} className="text-lg">
          {">"}
        </div>
      </div>
      {/* <div className="flex justify-center">
        {data.map((item, slideIdx) => (
          <div
            key={slideIdx}
            onClick={() => gotoSlide(slideIdx)}
            className="mx-1 cursor-pointer text-xs"
          >
            ●
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Carousel;

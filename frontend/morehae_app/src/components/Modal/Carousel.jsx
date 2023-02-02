import React from "react";

const Carousel = ({ reqData }) => {
  // const [currentIdx, setCurrentIdx] = useState(0);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    let slide = document.getElementById("slide");
    let slideWidth = slide.clientWidth;
    slider.scrollLeft -= slideWidth * 3;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    let slide = document.getElementById("slide");
    let slideWidth = slide.clientWidth;
    slider.scrollLeft += slideWidth * 3;
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
          className="w-full h-full overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {reqData.interview.map((item, slideIdx) => (
            <div
              id="slide"
              key={slideIdx}
              className="w-[165px] h-[165px] inline-block p-2 mx-1 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-blue-200 "
            >
              <div className="w-[165px]">{item.content}</div>
              <div className="text-xs text-gray-700">{item.interviewee}</div>
            </div>
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

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
          className="text-lg opacity-50 cursor-pointer hover:opacity-100p text-white"
        >
          {"<"}
        </div>
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth "
        >
          {reqData.interview.map((item, slideIdx) => (
            <div
              id="slide"
              key={slideIdx}
              className=" w-[163px] h-[180px] rounded-lg inline-block whitespace-normal border p-2 mx-1 cursor-pointer hover:scale-105 ease-in-out duration-300 border-[rgb(71,79,88)]  bg-[rgb(48,54,61)] "
            >
              <div>
                <p className=" w-[150px] h-[140px] text-[rgb(161,173,185)] hover:text-white text-sm">
                  {item.content}
                </p>
                <div className="flex justify-end">
                  <div className="text-xs text-[rgb(161,173,185)]  ">
                    {item.interviewee}
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={slideRight}
          className="text-lg opacity-50 cursor-pointer hover:opacity-100p text-white"
        >
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

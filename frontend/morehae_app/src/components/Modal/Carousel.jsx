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
          className="text-xl opacity-50 cursor-pointer hover:opacity-100 p-1 text-white"
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
              className=" w-[157px] h-[180px] rounded-lg inline-block whitespace-normal border p-2 mx-1.5 cursor-pointer  ease-in-out duration-300 border-[rgb(71,79,88)] hover:border-green-400"
            >
              <div>
                <p className=" w-[150px] h-[145px] text-[rgb(161,173,185)] duration-300 hover:text-white text-sm">
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
          className="text-xl opacity-50 cursor-pointer hover:opacity-100 p-1 text-white"
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

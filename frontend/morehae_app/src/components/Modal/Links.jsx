import React from "react";
import Carousel from "@/components/Modal/Carousel";

const Links = ({ reqData }) => {
  const openLink = (link) => {
    window.open(`${link}`, "_blank");
  };

  return (
    <div className="p-6">
      <div>
        <div className=" flex justify-between">
          <h2 className="text-xl my-1 text-white ">
            블로그
          </h2>
          <button className="rounded text-xs  text-[rgb(71,79,88)] hover:text-white">more..</button>
        </div>
        <div className="grid grid-cols-3 justify-items-center text-center p-3">
          <div className="bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)]  w-40 h-40 ">
            01
          </div>
          <div className="bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)] w-40 h-40 ">
            02
          </div>
          <div className="bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)] w-40 h-40 ">
            03
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-xl my-4  text-white">
          인터뷰
        </h2>
        <Carousel reqData={reqData} />
      </div>
      <div className="my-3">
        <h2 className="text-xl my-1 text-white ">
          추천 컨텐츠
        </h2>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3">
          {reqData.recommend_content.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                openLink(item.url);
              }}
              className="bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] w-xs h-xs"
            >
              <img src={item.img_url} alt="img" />
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;

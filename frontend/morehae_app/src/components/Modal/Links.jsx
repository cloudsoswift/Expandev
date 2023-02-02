import React from "react";
import Carousel from "@/components/Modal/Carousel";

const Links = ({ reqData }) => {
  const openLink = (link) => {
    window.open(`${link}`, "_blank");
  };

  return (
    <div>
      <div>
        <div className=" flex justify-between">
          <h2>Blog</h2>
          <button className="rounded text-xs">
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
        <Carousel reqData={reqData} />
      </div>
      <div className="my-3">
        <h2>RECOMMEND Contents</h2>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3">
          {reqData.recommend_content.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                openLink(item.url);
              }}
              className="bg-blue-100 w-xs h-xs"
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

import React from "react";
import Carousel from "./Carousel";

const Links = ({ reqData }) => {
  const openLink = (link) => {
    // window.open(`${link}`, "_blank");
  };

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
        <Carousel reqData={reqData}/>
      </div>
      <div>
        <h2>R Contents</h2>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3">
          {reqData.recommend_content.map((item) => (
            <div key={item.id} className="bg-blue-100 w-36 h-36">
              <div onClick={openLink(item.url)}>{item.title}</div>
              <img
                src={item.img_url}
                alt="img"
                
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;

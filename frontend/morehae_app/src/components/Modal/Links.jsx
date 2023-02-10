import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "@/components/Modal/Carousel";

import { AiOutlineEye } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
// import { BsArrowRightSquare } from "react-icons/bs";

const Links = ({ reqData }) => {
  const openLink = (link) => {
    window.open(`${link}`, "_blank");
  };

  let title = reqData.title;

  let navigate = useNavigate();

  const toPost = (id) => {
    navigate(`/blog/post/${id}`);
  };

  console.log(reqData);
  return (
    <div className="p-6">
      <div>
        <div className=" flex justify-between">
          <h2 className="text-xl my-1 text-white ">블로그</h2>
          <Link
            to={{ pathname: `/blog/tag/${title}`, search: `?count=1` }}
            className="rounded text-xs  text-[rgb(71,79,88)] hover:text-white"
          >
            more..
          </Link>
        </div>
        <div className="grid grid-cols-3 justify-items-center align-middle p-3 mx-1.5">
          {reqData.articles.length > 0 ? (
            reqData.articles
              ?.filter((item, index) => index <= 2)
              .map((post) => (
                <div
                  key={post?.id}
                  className=" group relative bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)] hover:border-green-400  w-40 h-40 text-[rgb(191,192,194)] hover:ease-in-out duration-200 "
                >
                  <div
                    onClick={() => toPost(post?.id)}
                    className="absolute h-40 z-10 opacity-0 group-hover:opacity-100 hover:ease-in-out duration-200 w-40 text-sm font-normal text-[rgb(191,192,194)] p-2"
                  >
                    <div className="text-xs h-32 text-white">
                      {[post?.overview]}
                    </div>
                    <div className="h-8">
                      {/* <BsArrowRightSquare className="text-right text-xs pb-2 pr-2"/> */}
                    </div>
                  </div>
                  <div className="group-hover:blur-sm hover:ease-in group-hover:opacity-20 duration-150 z-0">
                    <div className="w-40 h-8 border-b border-[rgb(71,79,88)] ">
                      <div className="p-2 text-sm font-normal  ">
                        {post?.title}
                      </div>
                    </div>
                    <div className="w-40 h-24 border-b border-[rgb(71,79,88)]">
                      <img
                        src={post?.thumbnail}
                        alt="이미지가 없습니다"
                        className="rounded-lg object-contain w-40 h-24"
                      />
                      <div className="w-40 h-8 ">
                        <div className="p-2 flex justify-end">
                          <div className="flex justify-between mr-2">
                            <AiOutlineEye className="text-sm font-normal mr-1" />
                            <div className="text-[0.5rem] font-normal  ">
                              {post?.hit}
                            </div>
                            {/* text-[0.6rem] font-normal mt-[0.20rem] mr-1 */}
                          </div>
                          <div className="flex justiy-between">
                            <FaHeart
                              className={
                                post?.liked
                                  ? "text-[0.6rem] font-normal mt-[0.20rem] mr-1 text-red-600"
                                  : "text-[0.6rem] font-normal mt-[0.20rem] mr-1 text-white"
                              }
                            />
                            <div className="text-[0.5rem] font-normal ">
                              {post?.like_users_count}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <>작성된 블로그 글이 없습니다</>
          )}
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-xl my-4  text-white">인터뷰</h2>
        {reqData?.interview?.length > 0 ? (
          <Carousel reqData={reqData} />
        ) : (
          <>인터뷰가 없습니다</>
        )}
      </div>
      <div className="my-3">
        <h2 className="text-xl my-1 text-[rgb(191,192,194)] hover:text-white ">
          추천 컨텐츠
        </h2>
        <div className="grid grid-cols-3 gap-3 justify-items-center text-center p-3 mx-1.5 ">
          {reqData?.recommend_content?.length > 0 ? (reqData?.recommend_content.map((post) => (
            <div key={post?.id}>
              <div
                onClick={() => {
                  openLink(post?.url);
                }}
                className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg w-xs h-xs  hover:ease-in-out duration-300 hover:border-green-400"
              >
                <div className="">
                  <div className="w-40 h-32 border-b border-[rgb(71,79,88)] ">
                    <img
                      src={post?.img_url}
                      alt="img"
                      className="rounded-lg object-contain w-40 h-32"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="text-sm w-40 h-8 pt-1">{post?.title}</div>
                </div>
              </div>
            </div>
          ))) : <>추천 컨텐츠가 없습니다</>}
          {}

          {/* {reqData.recommend_content.map((item) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Links;

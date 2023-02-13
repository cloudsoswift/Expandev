import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "@/components/Modal/Carousel";

import { AiOutlineEye } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BsArrowRightSquare } from "react-icons/bs";

const Links = ({ reqData }) => {
  const openLink = (link) => {
    if (window.confirm("해당 컨텐츠로 이동하시겠습니까?")) {
      window.open(`${link}`, "_blank");
    }
  };

  let title = reqData.title;

  let navigate = useNavigate();

  const toPost = (id) => {
    navigate(`/blog/post/${id}`);
  };


  return (
    <div className="p-6 ">
      <div className="">
        <div className=" flex justify-between ">
          <h2 className="text-xl my-3 text-white ">블로그</h2>
          <Link
            to={{
              pathname: `/blog/tag/${title?.replaceAll("?", "%3F")}`,
              search: `?count=1`,
            }}
            className="rounded text-xs text-[rgb(71,79,88)] hover:text-white"
          >
            more..
          </Link>
        </div>
        <div>
          {reqData?.articles?.length > 0 ? (
            <>
              <div className="grid grid-cols-3 justify-items-center align-middle p-3 mx-1.5 ">
                {reqData.articles
                  ?.filter((item, index) => index <= 2)
                  .map((post) => (
                    <div
                      key={post?.id}
                      className="group relative bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)] group-hover:border-green-400 group-hover:text-white w-40 h-40 text-[rgb(191,192,194)] group-hover:ease-in-out duration-200 "
                    >
                      <div className="absolute h-40 z-10 opacity-0 group-hover:opacity-100  w-40 text-sm font-normal text-[rgb(191,192,194)] p-2 border rounded-lg ease-in-out duration-300 group-hover:border-green-400">
                        <div className="text-xs h-32 text-white">
                          {[post?.overview]}
                        </div>
                        <div className="h-8 flex justify-end">
                          <BsArrowRightSquare
                            onClick={() => toPost(post?.id)}
                            className="text-xl cursor-pointer pb-1"
                          />
                        </div>
                      </div>
                      <div className="group-hover:blur-sm hover:ease-in group-hover:opacity-0 duration-150 z-0">
                        <div className="w-40 h-8 border-b border-[rgb(71,79,88)] ">
                          <div className="p-2 text-xs font-normal  ">
                            {post?.title}
                          </div>
                        </div>
                        <div className="w-40 h-24 border-b border-[rgb(71,79,88)]">
                          <img
                            src={post?.thumbnail}
                            alt="img"
                            className="object-cover w-40 h-24 text-xs"
                          />
                          <div className="w-40 h-4">
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
                  ))}
              </div>
            </>
          ) : (
            <div className="text-xs text-[rgb(191,192,194)]">
              작성된 글이 없습니다
            </div>
          )}
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-xl my-3 text-white">인터뷰</h2>
        {reqData?.interview?.length > 0 ? (
          <Carousel reqData={reqData} />
        ) : (
          <div className="text-xs text-[rgb(191,192,194)]">
            인터뷰가 없습니다
          </div>
        )}
      </div>
      <div className="my-3">
        <h2 className="text-xl my-3">추천 컨텐츠</h2>
        {reqData?.recommend_content?.length > 0 ? (
          <>
            <div className="grid grid-cols-3 justify-items-center text-center text-[rgb(191,192,194)] p-3 mx-1 ">
              {reqData?.recommend_content
                ?.filter((item, index) => index <= 2)
                .map((post) => (
                  <div key={post?.id}>
                    <div
                      onClick={() => {
                        openLink(post?.url);
                      }}
                      className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg w-xs h-xs hover:text-white ease-in-out duration-300 hover:border-green-400"
                    >
                      <div className="">
                        <div className="w-40 h-32 border-b border-[rgb(71,79,88)] ">
                          <img
                            src={post?.img_url}
                            alt="img"
                            className="rounded-t-lg object-cover w-[9.88rem] h-32"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <p className="text-xs w-40 h-8 px-2 pt-2 truncate ">
                          {post?.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="text-xs text-[rgb(191,192,194)]">
            추천컨텐츠가 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;

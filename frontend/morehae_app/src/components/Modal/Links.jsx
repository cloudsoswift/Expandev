import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "@/components/Modal/Carousel";

import { AiOutlineEye } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BsArrowRightSquare } from "react-icons/bs";

import { MdOutlineFeaturedPlayList } from "react-icons/md";

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
    <div className="m-3 p-3 rounded-lg bg-[rgb(48,54,61)] border-mbc border-4 border-double">
      <div className="flex">
        <MdOutlineFeaturedPlayList className="mt-1 mr-2 text-lg" />
        <div>Contents</div>
      </div>
      <div className="mb-2 ">
        <h2 className="text-sm mt-3 ml-7">추천 컨텐츠</h2>
        {reqData?.recommend_content?.length > 0 ? (
          <>
            <div className="grid grid-cols-3 justify-items-center text-center text-[rgb(191,192,194)] px-3 py-2 mx-1 ">
              {reqData?.recommend_content
                ?.filter((item, index) => index <= 2)
                .map((post) => (
                  <div key={post?.id}>
                    <div
                      onClick={() => {
                        openLink(post?.url);
                      }}
                      className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg w-xs h-xs hover:text-white ease-in-out duration-300 hover:border-green-400 drop-shadow-md"
                    >
                      <div className="">
                        <div className="w-40 h-32 border-b border-[rgb(71,79,88)] ">
                          <img
                            src={post?.img_url}
                            alt="img"
                            className="rounded-t-lg object-cover w-[9.88rem] h-[7.94rem]"
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
          <div className="grid grid-cols-3 text-center text-[rgb(191,192,194)] p-3 mx-1 ">
            <div className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg drop-shadow-md text-xs">
              <div className="pt-[4.5rem]">추천 컨텐츠가 없습니다</div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-2">
        <div className=" flex justify-between">
          <h2 className="text-sm text-white ml-7">블로그</h2>
          <Link
            to={{
              pathname: `/blog/tag/${title?.replaceAll("?", "%3F")}`,
              search: `?count=1`,
            }}
            className="mt-1.5 mr-6 rounded text-xs text-[rgb(191,192,194)] ease-in-out duration-300  hover:text-green-400 "
          >
            more..
          </Link>
        </div>
        <div>
          {reqData?.articles?.length > 0 ? (
            <>
              <div className="grid grid-cols-3 justify-items-center align-middle px-3 py-2 mx-1.5 ">
                {reqData.articles
                  ?.filter((item, index) => index <= 2)
                  .map((post) => (
                    <div
                      key={post?.id}
                      className="group relative bg-[rgb(36,41,47)] rounded-lg border border-[rgb(71,79,88)] group-hover:border-green-400 group-hover:text-white w-40 h-40 text-[rgb(191,192,194)] group-hover:ease-in-out duration-200 drop-shadow-md"
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
                            src={`http://i8d212.p.ssafy.io:8000${post?.thumbnail}`}
                            // src={post?.thumbnail}
                            alt="img"
                            className="object-cover w-[9.88rem] h-[5.88rem] text-xs"
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
            <div className="grid grid-cols-3 text-center text-[rgb(191,192,194)] p-3 mx-1 ">
              <div className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg drop-shadow-md text-xs">
                <div className="pt-[4.5rem]">작성된 글이 없습니다</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="">
        <h2 className="text-sm mb-2 text-white ml-7">인터뷰</h2>
        {reqData?.interview?.length > 0 ? (
          <Carousel reqData={reqData} />
        ) : (
          <div className="grid grid-cols-3 text-center text-[rgb(191,192,194)] p-3 mx-1 ">
            <div className="w-40 h-40 bg-[rgb(36,41,47)] border border-[rgb(71,79,88)] rounded-lg drop-shadow-md text-xs">
              <div className="pt-[4.5rem]">인터뷰가 없습니다</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;

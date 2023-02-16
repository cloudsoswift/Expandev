import { FaStar, FaHeart } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

const RoadmapTab = ({ userRoadmap }) => {
  return (
    <>
      <div className="mt-8 mb-12">
        <div className="m-3">즐겨찾기한 로드맵</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto customscrollbar ">
          {userRoadmap?.favorite_roadmpas.map((post) => (
            <div
              key={post?.id}
              className=" rounded-xl h-36 basis-72 bg-[rgb(45,51,59)] m-1 border border-[rgb(131,132,139)] drop-shadow-md transition hover:-translate-y-2 hover:border-green-400  hover:shadow-sm hover:shadow-green-200/50 "
            >
              <div className="text-sm font-medium leading-5  pt-3 pl-3 ">
                {post?.title}
              </div>
              <div className="text-sm h-[3.25rem] text-[rgb(191,192,194)] p-3 text-ellipsis line-clamp-2 overflow-hidden  border-[rgb(131,132,139)]">
                {post?.content}
              </div>
              <div className="h-5"></div>
              <div className="border-t p-3 border-[rgb(131,132,139)]">
                <div className="flex justify-end ">
                  <BsPeople className="text-[rgb(191,192,194)]" />
                  <div className="text-xs mx-1  text-[rgb(191,192,194)]">
                    {post?.favorites_count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">클리어한 노드</div>
        <div className="h-[230px] bg-[rgb(48,54,61)] border rounded-l-lg p-4 overflow-y-auto customscrollbar">
          {userRoadmap?.clear_nodes.map((post) => (
            <Link
              key={post?.id}
              to={{
                pathname: `/roadmap`,
                search: `?nodeId=${post?.id}`,
              }}
            >
              <span className="inline-block text-xs py-1 px-3 mx-1 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full transition hover:-translate-y-1  ">
                {post?.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">작성한 리뷰</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto cursor-pointer customscrollbar">
          {userRoadmap?.post_reviews.map((post) => (
            <div
              key={post?.id}
              className="rounded-xl h-40 basis-72 bg-[rgb(45,51,59)] m-1 border border-[rgb(131,132,139)] drop-shadow-md transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <Link
                to={{
                  pathname: `/roadmap`,
                  search: `?nodeId=${post?.node_id}`,
                }}
              >
                <div className="pt-3 px-3">
                  <div className="relative">
                    <div className="text-sm">{post?.nickname}</div>

                    <div className="absolute top-0 right-0 text-sm flex ">
                      <FaHeart
                        className={
                          post?.liked
                            ? "mt-1 text-xs text-red-600"
                            : "mt-1 text-xs text-white"
                        }
                      />
                      <div className="ml-1 mt-0.5 text-xs">
                        {post?.like_users_count}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex mt-2 mr-3">
                      <div className="text-xs mr-2">중요도</div>
                      {Array.from({ length: post?.importance }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from(
                        { length: 5 - post?.importance },
                        (v, idx) => (
                          <FaStar key={idx} className="text-sm text-white" />
                        )
                      )}
                    </div>
                    <div className="flex mt-2">
                      <div className="text-xs mr-2">난이도</div>
                      {Array.from({ length: post?.difficulty }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from(
                        { length: 5 - post?.difficulty },
                        (v, idx) => (
                          <FaStar key={idx} className="text-sm text-white" />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className=" text-[rgb(191,192,194)] mb-2 text-ellipsis line-clamp-2 ">
                  <div className="h-12 border-t  border-[rgb(131,132,139)] bg-[rgb(45,51,59)] text-sm text-white mt-2 ">
                    <div className="px-3 my-2">{post?.content}</div>
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-xs text-[rgb(191,192,194)] mb-1 absolute right-0 botton-0 p-3">
                    {new Date(post?.created_at).toLocaleDateString()}
                  </div>

                  <div className="inline-block text-xs py-1 px-3 mr-2 my-1 bg-green-100 text-green-600  rounded-full">
                    {post?.node_title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <div className="m-3">좋아요한 리뷰</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto cursor-pointer customscrollbar">
          {userRoadmap?.like_reviews.map((post) => (
            <div
              key={post?.id}
              className="rounded-xl h-40 basis-72 bg-[rgb(45,51,59)] m-1 border border-[rgb(131,132,139)] drop-shadow-md transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <Link
                to={{
                  pathname: `/roadmap`,
                  search: `?nodeId=${post?.node_id}`,
                }}
              >
                <div className="pt-3 px-3">
                  <div className="relative">
                    <div className="text-sm">{post?.nickname}</div>

                    <div className="absolute top-0 right-0 text-sm flex ">
                      <FaHeart
                        className={
                          post?.liked
                            ? "mt-1 text-xs text-red-600"
                            : "mt-1 text-xs text-white"
                        }
                      />
                      <div className="ml-1 mt-0.5 text-xs">
                        {post?.like_users_count}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex mt-2 mr-3">
                      <div className="text-xs mr-2">중요도</div>
                      {Array.from({ length: post?.importance }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from(
                        { length: 5 - post?.importance },
                        (v, idx) => (
                          <FaStar key={idx} className="text-sm text-white" />
                        )
                      )}
                    </div>
                    <div className="flex mt-2">
                      <div className="text-xs mr-2">난이도</div>
                      {Array.from({ length: post?.difficulty }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from(
                        { length: 5 - post?.difficulty },
                        (v, idx) => (
                          <FaStar key={idx} className="text-sm text-white" />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className=" text-[rgb(191,192,194)] mb-2 text-ellipsis line-clamp-2 ">
                  <div className="h-12 border-t  border-[rgb(131,132,139)] bg-[rgb(45,51,59)] text-sm text-white mt-2 ">
                    <div className="px-3 my-2">{post?.content}</div>
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-xs text-[rgb(191,192,194)] mb-1 absolute right-0 botton-0 p-3">
                    {new Date(post?.created_at).toLocaleDateString()}
                  </div>

                  <div className="inline-block text-xs py-1 px-3 mr-2 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full">
                    {post?.node_title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapTab;

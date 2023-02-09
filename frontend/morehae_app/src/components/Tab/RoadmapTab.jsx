import { BsPeople } from "react-icons/bs";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const RoadmapTab = ({ userRoadmap }) => {
  return (
    <>
      <div className="mt-8 mb-12">
        <div className="m-3">즐겨찾기한 로드맵</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto  ">
          <div className="relative rounded-xl h-32 basis-72 bg-[rgb(45,51,59)] p-3 m-1 border border-[rgb(131,132,139)] drop-shadow-md hover:border-white transition hover:-translate-y-2">
            <div className="text-md font-medium leading-5 mb-2 mt-1">
              {/* {post?.title} */}웹 공통 어쩌구
            </div>
            <div className="text-sm h-11 text-[rgb(191,192,194)] mb-4 text-ellipsis line-clamp-2 border-b border-[rgb(131,132,139)]">
              콘텐츠 설명 어쩌구저쩌구
            </div>

            <div className="absolute bottom-2.5 right-2.5 border-[rgb(131,132,139)]">
              <div className="flex justify-end ">
                <BsPeople className="text-[rgb(191,192,194)]" />
                <div className="text-xs mx-1 mb-0.5 text-[rgb(191,192,194)]">
                  6명이 진행중
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl h-32 basis-72 bg-[rgb(45,51,59)] p-3 m-1 border border-[rgb(131,132,139)] drop-shadow-md transition hover:-translate-y-2 hover:border-green-400  hover:shadow-sm hover:shadow-green-200/50 ">
            <div className="text-sm font-medium leading-5 mb-2 mt-1">
              {/* {post?.title} */}웹 공통 어쩌구
            </div>
            <div className="text-sm h-11 text-[rgb(191,192,194)] mb-4 text-ellipsis line-clamp-2 border-b border-[rgb(131,132,139)]">
              콘텐츠 설명 어쩌구저쩌구 콘텐츠 설명 어쩌구저쩌구콘텐츠 설명
              어쩌구저쩌구콘텐츠 설명 어쩌구저쩌구콘텐츠 설명 어쩌구저쩌구콘텐츠
              설명 어쩌구저쩌구콘텐츠 설명 어쩌구저쩌구콘텐츠 설명
              어쩌구저쩌구콘텐츠 설명 어쩌구저쩌구
            </div>

            <div className="absolute bottom-2.5 right-2.5 border-[rgb(131,132,139)]">
              <div className="flex justify-end ">
                <BsPeople className="text-[rgb(191,192,194)]" />
                <div className="text-xs mx-1 mb-0.5 text-[rgb(191,192,194)]">
                  6명이 진행중
                </div>
              </div>
            </div>
          </div>

          {userRoadmap?.favorite_roadmpas.map((post) => (
            <div
              key={post?.id}
              className="rounded-xl h-[90px] w-[90px] bg-white p-3 m-2 border-2 "
            >
              <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                <img src="" alt="" />
              </div>
              <h3 className="text-xs font-medium text-center leading-5 text-black">
                {post?.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">클리어한 노드</div>
        <div className="h-[230px] bg-[rgb(48,54,61)] border rounded-l-lg p-4 overflow-y-auto ">
          {userRoadmap?.clear_nodes.map((post) => (
            <span
              key={post?.id}
              className="inline-block text-xs py-1 px-3 mx-1 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full transition hover:-translate-y-1  "
            >
              {post?.title}
            </span>
          ))}
          {/* <span className="inline-block text-xs py-1 px-3 mx-1 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full ">
                  css
                </span>
                <span className="inline-block text-xs py-1 px-3 mx-1 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full ">
                  인터넷은 왜
                </span> */}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">작성한 리뷰</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto cursor-pointer ">
          {userRoadmap?.post_reviews.map((post) => (
            <div
              key={post?.id}
              className="rounded-xl h-40 basis-72 bg-[rgb(45,51,59)] p-3 m-1 border border-[rgb(131,132,139)] drop-shadow-md transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
              // onclick={}
            >
              <div className="">
                <div className="relative">
                  <div className="text-sm">{post?.nickname}닉네임</div>

                  <div className="absolute top-0 right-0 text-sm flex ">
                    {/* <BsPencilSquare /> */}
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
                    {Array.from({ length: 5 - post?.importance }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-white" />
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <div className="text-xs mr-2">난이도</div>
                    {Array.from({ length: post?.difficulty }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-yellow-300" />
                    ))}
                    {Array.from({ length: 5 - post?.difficulty }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-white" />
                    ))}
                  </div>
                </div>
              </div>
              <div className=" text-[rgb(191,192,194)] mb-2 text-ellipsis line-clamp-2 ">
                <div className="border-t h-12 border-[rgb(131,132,139)] bg-[rgb(45,51,59)] text-sm text-white mt-2 ">
                  <div className="my-2">{post?.content}</div>
                </div>
              </div>
              <div className="text-xs text-[rgb(191,192,194)] mb-1 absolute right-0 botton-0 p-3">
                {new Date(post?.created_at).toLocaleDateString()}
              </div>
              <Link
                to={{
                  pathname: `/roadmap`,
                  search: `?nodeId=${post?.node_id}`,
                }}
              >
                <div className="inline-block text-xs py-1 px-3 mr-2 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full">
                  {post?.node_title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">좋아요한 리뷰</div>
        <div className="h-60 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto  ">
          {userRoadmap?.like_reviews.map((post) => (
            <div
              key={post?.id}
              className="rounded-xl h-40 basis-72 bg-[rgb(45,51,59)] p-3 m-1 border border-[rgb(131,132,139)] drop-shadow-md  cursor-pointer transition hover:-translate-y-1 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
              // onclick={}
            >
              <div className="">
                <div className="relative">
                  <div className="text-sm">{post?.nickname}닉네임</div>

                  <div className="absolute top-0 right-0 text-sm flex ">
                    {/* <BsPencilSquare /> */}
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
                    {Array.from({ length: 5 - post?.importance }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-white" />
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <div className="text-xs mr-2">난이도</div>
                    {Array.from({ length: post?.difficulty }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-yellow-300" />
                    ))}
                    {Array.from({ length: 5 - post?.difficulty }, (v, idx) => (
                      <FaStar key={idx} className="text-sm text-white" />
                    ))}
                  </div>
                </div>
              </div>
              <div className=" text-[rgb(191,192,194)] mb-2 text-ellipsis line-clamp-2 ">
                <div className="border-t h-12 border-[rgb(131,132,139)] bg-[rgb(45,51,59)] text-sm text-white mt-2">
                  <div className="my-2">{post?.content}</div>
                </div>
              </div>
              <div className="text-xs text-[rgb(191,192,194)] mb-1 absolute right-0 botton-0 p-3">
                {new Date(post?.created_at).toLocaleDateString()}
              </div>
              <div className="inline-block text-xs py-1 px-3 mr-2 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full">
                {post?.node_title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapTab;

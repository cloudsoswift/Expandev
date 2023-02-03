import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

// css 관련
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ userRoadmap, userBlog }) {
  let [categories] = useState({ 로드맵: [userRoadmap], 블로그: [userBlog] });

  // console.log(userBlog);
  // console.log(userRoadmap?.clear_nodes[0]?.id, "id")
  // console.log(userRoadmap.reviews)

  return (
    <div className="w-full px-2 py-16 sm:px-0 ">
      <Tab.Group>
        {/* 탭 카테고리 리스트 */}
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        {/* 탭 내용 리스트 */}
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames("p-2 m-2")}>
            <div className="mb-12">
              <div className="m-3">즐겨찾기한 로드맵</div>
              <div className="h-[230px] bg-white border-2 rounded-lg flex flex-wrap p-4 overflow-y-auto">
                <div className="rounded-xl h-[90px] w-[90px] bg-white p-3 m-2 border-2 ">
                  <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <img src="" alt="" />
                  </div>
                  <h3 className="text-xs font-medium text-center leading-5">
                    일단 데이터 없음
                  </h3>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="m-3">클리어한 노드</div>
              <div className="h-[230px] bg-white border-2 rounded-lg p-4 overflow-y-auto">
                {userRoadmap?.clear_nodes.map((post) => (
                  <span
                    key={post?.id}
                    className="text-xs py-1 px-3 m-1 bg-blue-300 text-white border-2 hover:bg-blue-500 rounded-full"
                  >
                    {post?.content}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="m-3">작성한 리뷰</div>
              <div className="h-[230px]  bg-white border-2 rounded-lg  p-4 overflow-y-auto">
                {userRoadmap?.reviews.map((post) => (
                  <div
                    key={post?.id}
                    className="rounded-lg grid grid-flow-row h-[90px] w-1/2  m-1 "
                  >
                    <div className="row-span-2 p-3 bg-gray-100 rounded-t-lg">
                      <div className="relative flex">
                        <div className="text-sm font-bold">
                          {post?.node}노드이름필요
                        </div>
                        <div className="absolute top-0 right-0 text-sm">
                          <BsPencilSquare />
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <div className="text-xs mr-2">중요도</div>
                        {Array.from(Array(post?.importance), () => (
                          <div className="text-sm text-yellow-300">
                            <FaStar />
                          </div>
                        ))}
                        {Array.from(Array(5 - post?.importance), () => (
                          <div className="text-sm text-white">
                            <FaStar />
                          </div>
                        ))}
                      </div>
                      <div className="flex mt-1">
                        <div className="text-xs mr-2">난이도</div>
                        {Array.from(Array(post?.difficulty), () => (
                          <div className="text-sm text-yellow-300">
                            <FaStar />
                          </div>
                        ))}
                        {Array.from(Array(5 - post?.difficulty), () => (
                          <div className="text-sm text-white">
                            <FaStar />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className=" row-span-1 px-3 py-1 bg-blue-300 rounded-b-lg ">
                      <div className="text-sm text-white">{post?.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel className={classNames("p-2 m-2")}>
            <div className="mb-12">
              <div className="m-3">좋아요한 게시글</div>
              <div className="h-[230px] bg-white border-2 rounded-lg flex flex-wrap p-4 overflow-y-auto">
                {userBlog?.like_articles.map((post) => (
                  <div
                    key={post?.id}
                    className="rounded-xl h-[90px] w-[90px] bg-white p-3 m-2 border-2 "
                  >
                    <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 ">
                      <h3 className="text-xs font-medium text-center leading-5">
                        {post?.content}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="m-3">작성한 게시글</div>
              <div className="h-[230px] bg-white border-2 rounded-lg flex flex-wrap p-4 overflow-y-auto">
                {userBlog?.post_articles.map((post) => (
                  <div
                    key={post?.id}
                    className="rounded-xl h-[90px] w-[90px] bg-white p-3 m-2 border-2 "
                  >
                    <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <h3 className="text-xs font-medium text-center leading-5">
                        {post?.content}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="m-3">작성한 댓글</div>
              <div className="h-[230px] bg-white border-2 rounded-lg flex flex-wrap p-4 overflow-y-auto">
                {userBlog?.post_comments.map((post) => (
                  <div
                    key={post?.id}
                    className="rounded-xl h-[90px] w-[90px] bg-white p-3 m-2 border-2 "
                  >
                    <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <h3 className="text-xs font-medium text-center leading-5">
                        {post?.content}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

import { useState } from "react";
import { Tab } from "@headlessui/react";



import BlogTab from "./BlogTab";
import RoadmapTab from "./RoadmapTab";

// css 관련
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ userRoadmap, userBlog }) {
  let [categories] = useState({ 로드맵: [userRoadmap], 블로그: [userBlog] });

  return (
    <div className="w-full px-2 py-16 sm:px-0 ">
      <Tab.Group>
        {/* 탭 카테고리 리스트 */}
        <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                  "ring-white ring-opacity-60 focus:outline-none ",
                  selected
                    ? "bg-green-500 shadow"
                    : "text-green-100 hover:bg-white/[0.12] hover:text-white"
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
            <RoadmapTab userRoadmap={userRoadmap} />
          </Tab.Panel>
          <Tab.Panel className={classNames("p-2 m-2")}>
            <BlogTab userBlog={userBlog}/>
            
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

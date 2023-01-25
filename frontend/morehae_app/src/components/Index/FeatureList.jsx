import { Tab } from "@headlessui/react";
import { useState } from "react";
import FeatureItem from "@/components/Index/FeatureItem";

const DUMMY_DATA = [
  {
    id:1, 
    title: "로드맵",
    content: "로드맵을 통해 ",
    img: `roadmap.jpg`,
    to: "/roadmap",
  },
  {
    id:2, 
    title: "블로그",
    content: "로드맵과 함께 배운 정보를 나만의 블로그에 정리해보세요. 다른 사용자들은 어떻게 공부했는지 살펴보세요.",
    img: "blog.jpg",
    to: "/blog",
  },
  {
    id:3, 
    title: "리뷰",
    content: "",
    img: "review.jpg",
    to: "",
  },
];

const FeatureList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="place-items-center justify-center w-full pb-14">
      <div className="col-span p-4 shadow-md">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.Panels className="w-full h-full">
            {DUMMY_DATA.map((data) => (
              <FeatureItem key={data.id} data={data} />
              ))}
          </Tab.Panels>
          <Tab.List>
            <div className="flex justify-center space-x-2 mt-4">
              {DUMMY_DATA.map((data) => (
                <Tab className="px-2 bg-gray-800 rounded-2xl" key={data.id}>&nbsp;</Tab>
                ))}
            </div>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};

export default FeatureList;

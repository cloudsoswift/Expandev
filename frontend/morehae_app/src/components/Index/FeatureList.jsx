import { Tab } from "@headlessui/react";
import { useState } from "react";
import FeatureItem from "@/components/Index/FeatureItem";

const DUMMY_DATA = [
  {
    id:1, 
    title: "로드맵",
    content: "로드맵을 통해 희망하는 커리어를 준비하기 위해 무엇을 배워야 할지 찾아보세요.\n 그리고 학습한 부분에 대해 잘 이해했는지 자가진단도 해보세요.",
    img: `roadmap.jpg`,
    to: "/roadmap",
  },
  {
    id:2, 
    title: "블로그",
    content: "로드맵과 함께 배운 정보를 나만의 블로그에 정리해보세요.\n 다른 사용자들은 어떻게 공부했는지 살펴보세요.",
    img: "blog.jpg",
    to: "/blog",
  },
  {
    id:3, 
    title: "정보 공유",
    content: "로드맵의 각 키워드들에 대해 정보를 공유해보세요.\n 키워드에 대한 생각을 리뷰로 달거나, 관련된 글을 쓴 블로그도 확인해보세요.\n 키워드에 관련된 추천 컨텐츠나 인터뷰도 확인할 수 있습니다.",
    img: "review.jpg",
    to: "/roadmap",
  },
];

const FeatureList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="place-items-center justify-center w-full pb-14">
      <div className="py-4">
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

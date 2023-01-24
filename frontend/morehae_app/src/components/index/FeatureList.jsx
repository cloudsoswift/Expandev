import { Tab } from "@headlessui/react";
import { useState } from "react";
import FeatureItem from "@/components/Index/FeatureItem";

const DUMMY_DATA = [
  {
    id:1, 
    title: "로드맵",
    content: "",
    img: "",
    to: "",
  },
  {
    id:2, 
    title: "블로그",
    content: "",
    img: "",
    to: "",
  },
  {
    id:3, 
    title: "리뷰",
    content: "",
    img: "",
    to: "",
  },
];

const FeatureList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="grid grid-cols-1 place-items-center justify-center w-full pb-14">
      <div className="col-span w-4/5 p-4 bg-white rounded-xl shadow-md">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.Panels className="w-full">
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

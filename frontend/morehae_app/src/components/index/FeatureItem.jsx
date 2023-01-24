import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";

const FeatureItem = (props) => {
  return (
    <Tab.Panel>
      <div className="grid grid-cols-2 space-x-2 space-y-2">
        <div className="row-span-2 place-self-center">
          <img
            className="aspect-square"
            src={require("../../img/featurelist_temp_pic.jpg")}
            alt=""
          />
        </div>
        <div>
          <div className="text-2xl">
            <span>{props.data.title}</span>
          </div>
          <div className="">
            <span>
              {props.data.content}
            </span>
          </div>
        </div>
        <div className="self-end">
          <Link
            className="bg-black opacity-70 hover:opacity-100 text-white text bold rounded-lg p-3 inline-block w-full text-center mix-blend-multiply"
            to="/"
          >
            이동하기
          </Link>
        </div>
      </div>
    </Tab.Panel>
  );
};
export default FeatureItem;

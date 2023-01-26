import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";

const FeatureItem = (props) => {
  const image = require(`../../img/${props.data.img}`);
  return (
    <Tab.Panel>
      <div
        className="grid grid-cols-1 h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="grid bg-black opacity-70 py-10 space-y-4 align-middle">
          <div className="text-center">
            <div className="text-2xl text-white">
              <p>{props.data.title}</p>
            </div>
            <div className="text-white whitespace-pre-line">
              <p>{props.data.content}</p>
            </div>
          </div>
          <div className="self-end grid place-items-center">
            <Link
              className="bg-black border-2 text-white text bold rounded-lg p-3 inline-block w-1/2 text-center"
              to={props.data.to}
            >
              이동하기
            </Link>
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
};
export default FeatureItem;

import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";


const FeatureItem = (props) => {
  const image = require(`../../img/${props.data.img}`)
  return (
    <Tab.Panel>
      <div
        className="grid grid-cols-1 space-x-2 space-y-2 h-96 bg-cover bg-center opacity-30"
        style={{ "backgroundImage": `url(${image})` }}
      >
        <div className="text-center">
          <div className="text-2xl text-white">
            <span>{props.data.title}</span>
          </div>
          <div className="text-white">
            <span>{props.data.content}</span>
          </div>
        </div>
        <div className="self-end">
          <Link
            className="bg-black opacity-70 hover:opacity-100 text-white text bold rounded-lg p-3 inline-block w-full text-center mix-blend-multiply"
            to={props.data.to}
          >
            이동하기
          </Link>
        </div>
      </div>
    </Tab.Panel>
  );
};
export default FeatureItem;

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
            <span>{props.data.text}</span>
          </div>
          <div className="">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vehicula sollicitudin elit sit amet gravida. Duis eget mi eget
              enim blandit dictum sed quis eros. Fusce blandit id justo sit amet
              laoreet. Praesent vitae felis sed nisl egestas efficitur. Proin id
              lorem et est pellentesque sodales sed quis justo. Suspendisse
              tincidunt malesuada ex, a faucibus ex commodo in. Nunc vehicula
              tristique pulvinar. Fusce dignissim enim quam, sit amet suscipit
              eros rhoncus sollicitudin.
            </span>
          </div>
        </div>
        <div className="self-end">
          <Link
            className="bg-black opacity-90 text-white text bold rounded-lg p-3 inline-block w-full text-center"
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

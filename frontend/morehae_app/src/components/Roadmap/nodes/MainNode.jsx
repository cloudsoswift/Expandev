import { memo } from "react";
import { Handle, Position, useStore } from "reactflow";
import galaxyImage from "@/img/planet.png"

const zoomSelector = (s) => s.transform[2];
const MainNode = ({ data }) => {
  const isEssentialClass = data.isEssential ? "text-red-500" : "text-gray-500"
  const zoom = useStore(zoomSelector);

  return (
    <div className="px-4 py-2 shadow-md rounded-full w-96 h-96 text-center bg-cover border border-[rgb(71,79,88)]" style={{backgroundImage:`url(${galaxyImage})`, opacity: zoom >= 1.5 ? 0.3 : 1}}>
      <div className={isEssentialClass}>{data.isEssential ? "필수" : "선택"}</div>
      <div className="text-center">
        <div className="ml-2">
          <div className="text-red-500">{data.isComplete ? "Clear" : ""}</div>
        </div>
        <div className="text-2xl font-bold absolute bottom-0 left-1/2 -translate-x-1/2">{data.label}</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="sub" />
      <Handle type="source" position={data.direction === "LEFT" ? Position.Left : (data.direction === "MIDDLE" ? Position.Bottom : Position.Right)} id="main" />
      <Handle type="target" position={data.direction === "LEFT" ? Position.Right : (data.direction === "MIDDLE" ? Position.Top : Position.Left)} />
    </div>
  );
};

export default memo(MainNode);
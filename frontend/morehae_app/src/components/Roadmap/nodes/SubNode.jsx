import { memo } from "react";
import { Handle, Position } from "reactflow";
import essentialImage from "@/img/saturn.png";
import nonEssentialImage from "@/img/uranus.png";

const SubNode = ({ data }) => {
  const isEssentialClass = `justify-center ${
    data.isEssential ? "text-red-500" : "text-gray-300"
  }`;
  return (
    <div
      className={
        "px-2 py-2 shadow-md rounded-full border border-[rgb(71,79,88)] bg-cover w-20 h-20 text-center grid text-xs"
      }
      style={{
        backgroundImage: `url('${
          data.isEssential ? essentialImage : nonEssentialImage
        }')`,
        fontSize: "0.5rem",
      }}
    >
      {/* <div className={isEssentialClass}>
        {data.isEssential ? "필수" : "선택"}
      </div> */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="font-bold">{data.label}</div>
        <div className="text-gray-300">
          {data.isComplete ? "이수" : "미이수"}
        </div>
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(SubNode);

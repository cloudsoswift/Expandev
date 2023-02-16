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
      // 추가된것
      id="subcursor"
      className={
        "px-2 py-2 shadow-md w-20 h-20 text-center flex flex-col text-xs"
      }
    >
      {/* <div className={isEssentialClass}>
        {data.isEssential ? "필수" : "선택"}
      </div> */}
      <div
        className={
          `absolute top-0 left-1/2 -translate-x-1/2 font-bold ${data.isComplete
            ? "text-green-500"
            : "text-red-500"}`
        }
      >
        {data.isComplete ? "이수" : "미이수"}
      </div>
      <div
        className="bg-contain bg-center bg-no-repeat grow"
        style={{
          backgroundImage: `url('${
            data.isEssential ? essentialImage : nonEssentialImage
          }')`,
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div
          className="font-bold whitespace-nowrap overflow-x-clip"
          style={{ fontSize: "0.5rem" }}
        >
          {data.label}
        </div>
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(SubNode);

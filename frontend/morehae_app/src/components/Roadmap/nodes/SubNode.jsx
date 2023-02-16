import { memo, useState } from "react";
import { Handle, NodeToolbar, Position } from "reactflow";
import essentialImage from "@/img/saturn.png";
import nonEssentialImage from "@/img/uranus.png";

const SubNode = ({ data }) => {
  // const isEssentialClass = `justify-center ${
  //   data.isEssential ? "text-red-500" : "text-gray-300"
  // }`;
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false);
  return (
    <div
      // 추가된것
      id="subcursor"
      className={
        "px-2 py-2 w-20 h-20 text-center flex flex-col text-xs"
      }
      onMouseEnter={()=>{setTooltipIsVisible(true)}}
      onMouseLeave={()=>{setTooltipIsVisible(false)}}
    >
      {/* <div className={isEssentialClass}>
        {data.isEssential ? "필수" : "선택"}
      </div> */}
      <NodeToolbar isVisible={tooltipIsVisible} position={Position.Bottom}>
        <div className="text-xs bg-slate-700 p-2 rounded-2xl">{data.completion_count}명이 이수했습니다.</div>
      </NodeToolbar>
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

      <Handle type="target" position={Position.Left} className="left-1/2 opacity-0" isConnectable={false} />
      <Handle type="source" position={Position.Right} className="right-1/2 opacity-0" isConnectable={false} />
    </div>
  );
};

export default memo(SubNode);

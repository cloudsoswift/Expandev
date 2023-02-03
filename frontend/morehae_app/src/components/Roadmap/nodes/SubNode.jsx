import { memo } from "react";
import { Handle, Position } from "reactflow";


const SubNode = ({data}) => {
  const isEssentialClass = data.isEssential ? "text-red-500" : "text-gray-500"
    return (
      <div className="px-4 py-2 shadow-md rounded-md bg-gray-300 border-2">
      <div className={isEssentialClass}>{data.isEssential ? "필수" : "선택"}</div>
      <div className="flex">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
          <div className="text-gray-500">{data.isComplete}</div>
          <div className="text-gray-500">{data.isEssential}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} />
    </div>
    )
}

export default memo(SubNode);
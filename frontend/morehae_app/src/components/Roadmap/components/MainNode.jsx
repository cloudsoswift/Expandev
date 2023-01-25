import { useEffect } from "react";

const MainNode = ({
  mainNodeData,
  roadmapWidth,
  yposObj,
}) => {
  const mainWidth = 80;
  const mainHeight = 20;
  const mainFill = "orange";

  function clickHandler() {
    console.log("메인 노드 클릭됨:", mainNodeData.id);
  }

  const rect = (
    <g className="main-node" onClick={clickHandler}>
      <rect
        x={roadmapWidth / 2 - mainWidth / 2}
        y={yposObj.ypos}
        width={mainWidth}
        height={mainHeight}
        fill={mainFill}
        rx="5"
        ry="5"
      />
      <text
        x={roadmapWidth / 2 - mainWidth / 2 + mainWidth / 2}
        y={yposObj.ypos + mainHeight / 2}
        fontSize="5"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {" "}
        {mainNodeData.title}
      </text>
    </g>
  );
  yposObj.setYpos(mainHeight + 10);
  return rect;
};

export default MainNode;

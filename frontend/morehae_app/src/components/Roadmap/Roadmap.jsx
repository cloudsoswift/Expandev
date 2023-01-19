import RoadmapSection from "./RoadmapSection";
import Julgi from "./components/Julgi";
import { useEffect } from "react";

const Roadmap = ({ nodesDataJSON, handleClickButton }) => {
  // 노드들 데이터 프로퍼티
  const nodesData = nodesDataJSON.nodesData; // 선택) try-catch로 안전하게 파싱하기
  let yposObj = {
    ypos: 5,
    setYpos(val) {
      this.ypos += val;
    },
  };
  const roadmapWidth = 300;
  const roadmapHeight = 110 * (nodesData.length + 1) - 30;
  const viewBoxArgs = "0 0 300 " + roadmapHeight;

  useEffect(() => {
    // console.log("Roadmap 렌더링됨");
    console.log(typeof handleClickButton, "0000");
  });

  return (
    <svg viewBox={viewBoxArgs}>
      {nodesData.map((mainNodeData) => (
        <RoadmapSection
          key={mainNodeData.order}
          roadmapWidth={roadmapWidth}
          yposObj={yposObj}
          mainNodeData={mainNodeData}
          handleClickButton={handleClickButton}
        />
      ))}
      <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
    </svg>
  );
};

export default Roadmap;

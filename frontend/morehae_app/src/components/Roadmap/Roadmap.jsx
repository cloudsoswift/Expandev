import RoadmapSection from "./RoadmapSection";
import Julgi from "./components/Julgi"

const Roadmap = ({nodesDataJSON}) => {
  // 노드들 데이터 프로퍼티
  const nodesData = nodesDataJSON.nodesData;  // 선택) try-catch로 안전하게 파싱하기
  let yposObj = {
    ypos: 5,
    setYpos(val) {
      this.ypos += val
    }
  }
  const roadmapWidth = 300;
  const roadmapHeight = 110 * (nodesData.length+1)-30;
  const viewBoxArgs = "0 0 300 " + roadmapHeight
  
  return (
    <svg viewBox={viewBoxArgs}>
      {nodesData.map(mainNodeData => <RoadmapSection key={mainNodeData.order} roadmapWidth={roadmapWidth} yposObj={yposObj} mainNodeData={mainNodeData}/>)}
      <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
    </svg>
  )
}

export default Roadmap;
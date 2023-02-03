import Julgi from "@/components/Roadmap/components/Julgi";
import MainNode from "@/components/Roadmap/components/MainNode";
import SubNode from "@/components/Roadmap/components/SubNode";

const RoadmapSection = ({
  roadmapWidth,
  yposObj,
  mainNodeData,
  handleClickButton,
}) => {
  switch (mainNodeData.childs.length) {
    case 1:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    case 2:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[1]}
            xpos={210}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    case 3:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="42.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[1]}
            xpos={10}
            yposObj={yposObj}
            dy="17.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[2]}
            xpos={210}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    case 4:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="42.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[1]}
            xpos={10}
            yposObj={yposObj}
            dy="17.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[2]}
            xpos={210}
            yposObj={yposObj}
            dy="42.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[3]}
            xpos={210}
            yposObj={yposObj}
            dy="17.5"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    case 5:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="55"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[1]}
            xpos={10}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[2]}
            xpos={10}
            yposObj={yposObj}
            dy="5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[3]}
            xpos={210}
            yposObj={yposObj}
            dy="42.5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[4]}
            xpos={210}
            yposObj={yposObj}
            dy="17.5"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    case 6:
      return (
        <g>
          <Julgi roadmapWidth={roadmapWidth} yposObj={yposObj} />
          <MainNode
            mainNodeData={mainNodeData}
            roadmapWidth={roadmapWidth}
            yposObj={yposObj}
          />
          <SubNode
            subNodeData={mainNodeData.childs[0]}
            xpos={10}
            yposObj={yposObj}
            dy="55"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[1]}
            xpos={10}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[2]}
            xpos={10}
            yposObj={yposObj}
            dy="5"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[3]}
            xpos={210}
            yposObj={yposObj}
            dy="55"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[4]}
            xpos={210}
            yposObj={yposObj}
            dy="30"
            handleClickButton={handleClickButton}
          />
          <SubNode
            subNodeData={mainNodeData.childs[5]}
            xpos={210}
            yposObj={yposObj}
            dy="5"
            handleClickButton={handleClickButton}
          />
        </g>
      );
    default:
      return (
        <text x="30" y="30">
          그릴 수 없음
        </text>
      );
  }
};

export default RoadmapSection;

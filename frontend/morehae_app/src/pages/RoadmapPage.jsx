import Roadmap from "../components/Roadmap/Roadmap";
import nodesDataJSON from "./nodesDataJSON.json"
import Dropdown from "../components/Dropdown/Dropdown";

const RoadmapPage = () => {
  return (
    <div>
      {/* <Dropdown /> */}
      <Roadmap nodesDataJSON={nodesDataJSON}/>
    </div>
  )
}

export default RoadmapPage;
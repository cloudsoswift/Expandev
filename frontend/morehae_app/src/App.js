import Roadmap from "./RoadMap/Roadmap";
import nodesDataJSON from "./nodesDataJSON.json"

function App() {
  return (
    <Roadmap nodesDataJSON={nodesDataJSON}/>
  );
}

export default App;

import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

import ELK from "elkjs";
import { useEffect } from "react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "웹 공통" } },
  { id: "2", position: { x: 0, y: 0 }, data: { label: "웹페이지를 만들어볼까" } },
  { id: "3", position: { x: 0, y: 0 }, data: { label: "HTTP & HTTPS" } },
  { id: "4", position: { x: 0, y: 0 }, data: { label: "도메인" } },
  { id: "5", position: { x: 0, y: 0 }, data: { label: "인터넷" } },
  { id: "6", position: { x: 0, y: 0 }, data: { label: "CSS" } },
  { id: "7", position: { x: 0, y: 0 }, data: { label: "Javascript(기초)" } },
];

const initialEdges = [
  { id: "e1-4", source: "1", target: "5" },
  { id: "e5-3", source: "5", target: "3" },
  { id: "e5-4", source: "5", target: "4" },
  { id: "e5-2", source: "5", target: "2" },
  { id: "e5-6", source: "2", target: "6" },
  { id: "e5-7", source: "2", target: "7" },
];

const elk = new ELK();
const elkLayout = () => {
  const nodesForElk = initialNodes.map((node) => {
    return {
      id: node.id,
      width: 70,
      height: 70,
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "nodePlacement.strategy": "SIMPLE",
    },
    children: nodesForElk,
    edges: initialEdges,
  };
  return elk.layout(graph);
};

const RoadMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  useEffect(()=>{
    elkLayout().then((graph) => {
      setNodes(graph.children.map((node)=>{
        return {...initialNodes.find((n) => n.id === node.id), position: { x: node.x, y: node.y}}
      }))
      setEdges(graph.edges);
    });
  }, []);
  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
      </ReactFlow>
    </div>
  );
};
export default RoadMap;

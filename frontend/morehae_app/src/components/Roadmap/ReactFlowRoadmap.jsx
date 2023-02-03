import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow"; // 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import ELK from "elkjs";
import { useCallback, useEffect, useState } from "react";
import MainNode from "@/components/Roadmap/nodes/MainNode";
import SubNode from "@/components/Roadmap/nodes/SubNode";

// Node Type 관련
const nodeTypes = {
  main: MainNode,
  sub: SubNode
}
// Layout에 따른 노드 위치 계산을 위한 Elk Layout 설정
const elk = new ELK();
const elkLayout = (nodes, edges, direction = "DOWN", algorithm = "mrtree") => {
  const nodesForElk = nodes.map((node) => {
    console.log(node);
    return {
      id: node.id,
      width: 150,
      height: 40,
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": algorithm,
      "elk.direction": direction,
      "nodePlacement.strategy": "SIMPLE",
    },
    children: nodesForElk,
    edges: edges,
  };
  return elk.layout(graph);
};
const ReactFlowRoadmapComponent = ({ nodesDataList, loadNodeDetail, openAll }) => {
  // reactFlow 관련 state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clickedNode, setClickedNode] = useState(null);
  /* 로드맵 관련 state들 */
  const { setViewport, zoomIn, zoomOut, setCenter } = useReactFlow();

  useEffect(() => {
    let initialNodes = [];
    let initialEdges = [];
    // depth = 0 노드( 최-상단 주제 노드 )
    const calcRoadMap = async () => {
      setCenter(0, 0, { duration: 800, zoom: 1 });
      let before_node = {
        id: "0",
        type: 'main',
        data: {
          label: nodesDataList.title,
        },
        parentNode: null,
        position: {
          x: 0,
          y: 0,
        },
        hidden: false,
      };
      initialNodes.push({
        ...before_node,
      });
      // 메인 노드 순회
      nodesDataList.nodesData?.forEach((main_node) => {
        // 메인 노드를 노드 목록에 추가
        initialNodes.push({
          id: main_node.id.toString(),
          type: 'main',
          data: {
            label: main_node.title,
            isComplete: main_node.isComplete,
            isEssential: main_node.isEssential,
            depth: main_node.depth,
          },
          parentNode: before_node.id.toString(),
          position: {
            x: 0,
            y: 0,
          },
          hidden: false,
        });
        // 현재 메인 노드의 하위 서브 노드 순회
        main_node.childs?.forEach((sub_node) => {
          // 서브 노드를 노드 목록에 추가
          initialNodes.push({
            id: sub_node.id.toString(),
            type: 'sub',
            data: {
              label: sub_node.title,
              isComplete: sub_node.isComplete,
              isEssential: sub_node.isEssential,
              depth: sub_node.depth,
            },
            parentNode: main_node.id.toString(),
            position: {
              x: 0,
              y: 0,
            },
            hidden: true,
          });
          // 메인 노드 -> 서브 노드로 향하는 엣지를 엣지 목록에 추가
          initialEdges.push({
            id: `e${main_node.id}-${sub_node.id}`,
            data: {
              depth: sub_node.depth,
            },
            source: main_node.id.toString(),
            target: sub_node.id.toString(),
            hidden: true,
            sourceHandle: "sub",
          });
        });
        // 이전 메인 노드 -> 현재 메인 노드로 향하는 엣지를 엣지 목록에 추가
        initialEdges.push({
          id: `e${before_node.id}-${main_node.id}`,
          data: {
            depth: main_node.depth,
          },
          source: before_node.id.toString(),
          target: main_node.id.toString(),
          sourceHandle: "main",
        });
        // 현재 메인 노드를 이전 메인 노드로 기록
        before_node = main_node;
      });

      // 메인 노드 = 노드 중 id가 0 ( 최 상단) 이거나 depth 가 1
      const mainNodes = initialNodes.filter(
        (node) => node.id === "0" || node.data.depth === 1
      );
      // 메인 엣지 = 엣지 중 target이 메인 노드들 중 하나의 id와 일치하는 것
      // ( = [메인 노드 id 리스트] 안에 포함된 노드 id를 target으로 하는 엣지 )
      const mainEdges = initialEdges.filter((edge) =>
        mainNodes.map((node) => node.id).includes(edge.target)
      );
      console.log(mainNodes, mainEdges);
      // 먼저 메인 노드, 엣지에 대하여 Elk를 통한 Position 계산
      const outerFunction = async () => {
        const tempFunction = async () => {
          const graph = await elkLayout(mainNodes, mainEdges);
          console.log("1. 그래프 계산");
          console.log(graph);
          // Main Node에만 계산한 position 값 추가 반경, 이외에는 그냥 원래 노드값만.
          initialNodes = initialNodes.map((node) => {
            const calcedNode = graph.children.find((n) => n.id === node.id);
            return {
              ...node,
              ...(calcedNode && {
                position: { x: calcedNode.x, y: calcedNode.y },
              }),
            };
          });
          // Main Edge에만 계산한 위치값(selection) 추가 반경, 이외에는 그냥 원래 노드값만.
          initialEdges = initialEdges.map((edge) => {
            const calcedEdge = graph.edges.map((e) => e.id === edge.id);
            return {
              ...edge,
              ...(calcedEdge && { ...calcedEdge }),
            };
          });
          // 각 메인 노드들에 대해 해당 메인 노드와 서브 노드에 대해 ELk를 통한 Position 계산
          for (let mainNode of mainNodes) {
            console.log(mainNode);
            // 루트 노드("웹 공통" 같은 것)의 경우 스킵
            if (mainNode.id === "0") {
              continue;
            }
            //
            const subNodes = initialNodes.filter(
              (node) =>
                node.id === mainNode.id ||
                (node.parentNode === mainNode.id && node.data.depth === 2)
            );
            const subEdges = initialEdges.filter(
              (edge) => edge.source === mainNode.id && edge.data.depth === 2
            );
            console.log(subNodes, subEdges);
            const subGraph = await elkLayout(
              subNodes,
              subEdges,
              "RIGHT",
              "layered"
            );
            console.log("돌았다");
            // 현재 메인 노드 및 서브노드에만 계산한 position 값 추가 반경, 이외에는 그냥 원래 노드값만.
            initialNodes = initialNodes.map((node) => {
              const calcedNode = subGraph.children.find(
                (n) => n.id === node.id
              );
              return {
                ...node,
                ...(calcedNode &&
                  calcedNode.id !== mainNode.id && {
                    position: {
                      x: mainNode.position.x + calcedNode.x,
                      y: mainNode.position.y + calcedNode.y,
                    },
                  }),
              };
            });
            // 현재 메인 노드 및 서브노드에 관련된 엣지만 계산한 위치값(selection) 추가 반경,
            // 이외에는 그냥 원래 노드값만.
            initialEdges = initialEdges.map((edge) => {
              const calcedEdge = subGraph.edges.map((e) => e.id === edge.id);
              return {
                ...edge,
                ...(calcedEdge && { ...calcedEdge }),
              };
            });
          }
        };
        await tempFunction();
        setNodes(initialNodes);
        setEdges(initialEdges);
        console.log(initialNodes);
        console.log(initialEdges);
      };
      outerFunction();
    };
    calcRoadMap();
  }, [nodesDataList]);
  useEffect(()=>{
    setNodes((prevNodes)=>prevNodes.map((node)=>{return {...node, hidden: (node.data.depth === 2 ? openAll : node.hidden)}}));
    setEdges((prevEdges)=>prevEdges.map((edge)=>{return {...edge, hidden: (edge.data.depth === 2 ? openAll : edge.hidden)}}));
  }, [openAll])

  const handleNodeClick = useCallback(
    (event, eventNode) => {
      // 클릭된 노드 depth가 undefined(최상단 노드) 거나 depth가 2(서브 노드)인겅우 별다른 작업 수행 X
      if (eventNode.data.depth === undefined) {
        return;
      }
      console.log(eventNode, "이벤트 노드 바뀜.");
      // setClickedNode(eventNode);
      // 노드 클릭시, 해당 노드가 메인 노드라면 해당 메인 노드의 서브 노드들의 Visible Toggle.
      if (eventNode.data.depth === 2) {
        console.log(eventNode.id);
        loadNodeDetail(eventNode.id);
        return;
      }
      setNodes((prevNodes) =>
        prevNodes?.map((node) => {
          return {
            ...node,
            hidden:
              node.parentNode === eventNode.id && node.data.depth === 2
                ? !node.hidden
                : node.data.depth === 2
                ? true
                : node.hidden,
          };
        })
      );
      setEdges((prevEdges) =>
        prevEdges?.map((edge) => {
          return {
            ...edge,
            hidden:
              edge.source === eventNode.id && edge.data.depth === 2
                ? !edge.hidden
                : edge.data.depth === 2
                ? true
                : edge.hidden,
          };
        })
      );
      setViewport(
        {
          x: eventNode.positionAbsolute.x,
          y: -eventNode.positionAbsolute.y,
          zoom: 1,
        },
        { duration: 800 }
      );
    },
    [loadNodeDetail, setViewport]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodesConnectable={false}
      nodesDraggable={false}
      nodeTypes={nodeTypes}
      onNodeClick={handleNodeClick}
      className="mt-40"
    />
  );
};

const ReactFlowRoadmap = ({ nodesDataList, loadNodeDetail }) => {
  const [ isOpenAll, setIsOpenAll ] = useState(false);
  const handleOpenAll = () => {
    setIsOpenAll(prevState => !prevState);
  }
  return (
    <div className="w-full h-full">
      <button onClick={handleOpenAll}>전체 열기</button>
      <ReactFlowProvider>
        <ReactFlowRoadmapComponent
          nodesDataList={nodesDataList}
          loadNodeDetail={loadNodeDetail}
          openAll={isOpenAll}
        />
        <MiniMap />
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowRoadmap;

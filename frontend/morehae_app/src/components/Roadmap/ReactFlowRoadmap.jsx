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
import galaxyImage from "@/img/galaxy.jpg"

// Node Type 관련
const nodeTypes = {
  main: MainNode,
  sub: SubNode,
};
// Layout에 따른 노드 위치 계산을 위한 Elk Layout 설정
const elk = new ELK();
const elkLayout = (
  nodes,
  edges,
  direction = "DOWN",
  algorithm = "mrtree",
  width = 384,
  height = 384
) => {
  const nodesForElk = nodes.map((node) => {
    // console.log(node);
    return {
      id: node.id,
      width: width,
      height: height,
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": algorithm,
      "elk.direction": direction,
      "nodePlacement.strategy": "SIMPLE",
      ...(algorithm === "box" && { "elk.contentAlignment": "V_CENTER" })
    },
    children: nodesForElk,
    edges: edges,
  };
  return elk.layout(graph);
};
const ReactFlowRoadmapComponent = ({
  nodesDataList,
  loadNodeDetail,
  openAll,
}) => {
  // reactFlow 관련 state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clickedNode, setClickedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isShown, setIsShown] = useState(false);

  /* 로드맵 관련 state들 */
  const { setViewport, zoomIn, zoomOut, setCenter, getZoom } = useReactFlow();

  useEffect(() => {
    let initialNodes = [];
    let initialEdges = [];
    // depth = 0 노드( 최-상단 주제 노드 )
    const calcRoadMap = async () => {
      setCenter(0 + 384 / 2, 0 + 384 / 2, { duration: 800, zoom: 1 });
      let before_node = {
        id: "0",
        type: "main",
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
          type: "main",
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
          extent: "parent",
          hidden: false,
        });
        // 현재 메인 노드의 하위 서브 노드 순회
        main_node.childs?.forEach((sub_node) => {
          // 서브 노드를 노드 목록에 추가
          initialNodes.push({
            id: sub_node.id.toString(),
            type: "sub",
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
          initialNodes.forEach((other_node) => {
            if (
              other_node.parentNode === main_node.id.toString() &&
              other_node.id !== sub_node.id.toString()
            ) {
              // 부모가 같은 서브 노드 -> 서브 노드로 향하는 엣지를 엣지 목록에 추가
              initialEdges.push({
                id: `e${sub_node.id}-${other_node.id}`,
                data: {
                  depth: sub_node.depth,
                  parentNode: main_node.id.toString(),
                },
                source: sub_node.id.toString(),
                target: other_node.id.toString(),
                hidden: true,
                sourceHandle: "sub",
              });
            }
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
      // console.log(mainNodes, mainEdges);
      // 먼저 메인 노드, 엣지에 대하여 Elk를 통한 Position 계산
      const outerFunction = async () => {
        const tempFunction = async () => {
          const graph = await elkLayout(mainNodes, mainEdges, "DOWN", "mrtree");
          // console.log("1. 그래프 계산");
          // console.log(graph);
          // Main Node에만 계산한 position 값 추가 반경, 이외에는 그냥 원래 노드값만.
          let count = 0;
          let diff = -600;
          initialNodes = initialNodes.map((node) => {
            const calcedNode = graph.children.find((n) => n.id === node.id);
            const parentNode = graph.children.find(
              (n) => n.id === node.parentNode
            );
            if (calcedNode) {
              diff = count % 4 === 0 ? diff * -1 : diff;
              count++;
            }
            const newNode = {
              ...node,
              // 최-상단 노드인 경우.
              ...(calcedNode && {
                position: { x: calcedNode.x, y: calcedNode.y },
                data: {
                  ...node.data,
                  direction: diff > 0 ? "RIGHT" : "LEFT",
                },
              }),
              // 일반 메인 노드인 경우. 우측으로 진행중이면 양의 diff값을, 왼쪽으로 진행중이면 음의 diff값을 x 값에 지정.
              ...(calcedNode &&
                parentNode && {
                  position: { x: diff, y: calcedNode.y - parentNode.y },
                  data: {
                    ...node.data,
                    direction:
                      count % 4 === 0 ? "MIDDLE" : diff > 0 ? "RIGHT" : "LEFT",
                  },
                }),
            };
            // console.log(count, diff);
            return newNode;
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
            // console.log(mainNode);
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
              (edge) =>
                edge.data?.parent === mainNode.id && edge.data.depth === 2
            );
            // console.log(subNodes, subEdges);
            const subGraph = await elkLayout(
              subNodes,
              subEdges,
              "DOWN",
              "box",
              68,
              68
            );
            // console.log("돌았다");
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
                      x: calcedNode.x,
                      y: calcedNode.y,
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
        // console.log(initialNodes);
        // console.log(initialEdges);
      };
      outerFunction();
    };
    calcRoadMap();
  }, [nodesDataList]);
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        return {
          ...node,
          hidden: node.data.depth === 2 ? openAll : node.hidden,
        };
      })
    );
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        return {
          ...edge,
          hidden: edge.data.depth === 2 ? openAll : edge.hidden,
        };
      })
    );
  }, [openAll]);

  const handleNodeClick = useCallback(
    (event, eventNode) => {
      // 클릭된 노드 depth가 undefined(최상단 노드) 거나 depth가 2(서브 노드)인겅우 별다른 작업 수행 X
      if (eventNode.data.depth === undefined) {
        return;
      }
      // console.log(eventNode, "이벤트 노드 바뀜.");
      // setClickedNode(eventNode);
      // 노드 클릭시, 해당 노드가 메인 노드라면 해당 메인 노드의 서브 노드들의 Visible Toggle.
      if (eventNode.data.depth === 2) {
        // console.log(eventNode.id);
        loadNodeDetail(eventNode.id);
        return;
      }
      setCenter(eventNode.positionAbsolute.x + eventNode.width / 2, eventNode.positionAbsolute.y + eventNode.height / 2, {
        zoom: 1.5,
        duration: 800,
      });
      setZoomLevel(1.5);
    },
    [loadNodeDetail, setViewport]
  );
  const handleMouseMoveEnd = useCallback(
    (event, viewport) => {
      // console.log("END", event, viewport);
      if (event.type === "wheel") {
        // console.log(viewport.zoom);
        // console.log(hoveredNode);
        setZoomLevel(viewport.zoom);
      }
    },
    // }
    [hoveredNode]
  );

  const handleNodeMouseEnter = useCallback((e, n) => {
    if (n.data.depth === 2 || n.id === hoveredNode?.id) return;
    setHoveredNode(n);
  }, [hoveredNode]);

  // Zoom 값 또는 현재 hover된 노드 값이 바뀔 떄 마다 하위 노드를 보여주는 상태인지 아닌지를 Update
  useEffect(() => {
    if (zoomLevel >= 1.5) {
      if (hoveredNode) {
        // Zoom이 1.5배 이상이면서, hover된 노드가 있는 경우. => hover된 노드의 SubNode들을 보이게 해줘야 함.
        setIsShown(true);
      } else {
        // Zoom이 1.5배 이상이면서, hover된 노드가 없는 경우. => 표시되어있는 SubNode 안 보이게 해야 함.
        setIsShown(false);
      }
    } else {
      // Zoom이 2배 이하인 경우
      setIsShown(false);
    }
  }, [hoveredNode, zoomLevel]);

  useEffect(() => {
    // 하위 노드들을 보여주는 상태 => 현재 hover된 메인 노드의 하위 노드들을 보여줌.
    if (isShown && hoveredNode) {
      setNodes((prevNodes) =>
        prevNodes?.map((node) => {
          return {
            ...node,
            hidden:
              node.parentNode === hoveredNode.id && node.data.depth === 2
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
              edge.data?.parentNode === hoveredNode.id && edge.data.depth === 2
                ? !edge.hidden
                : edge.data.depth === 2
                ? true
                : edge.hidden,
          };
        })
      );
    } else {
      // 메인 노드 = 노드 중 id가 0 ( 최 상단) 이거나 depth 가 1
      const mainNodes = nodes.filter(
        (node) => node.id === "0" || node.data.depth === 1
      );
      setNodes((prevNodes) =>
        prevNodes?.map((node) => {
          return {
            ...node,
            hidden: mainNodes.includes(node) ? false : true,
          };
        })
      );
      // 메인 엣지 = 엣지 중 target이 메인 노드들 중 하나의 id와 일치하는 것
      // ( = [메인 노드 id 리스트] 안에 포함된 노드 id를 target으로 하는 엣지 )
      const mainEdges = edges.filter((edge) =>
        mainNodes.map((node) => node.id).includes(edge.target)
      );
      setEdges((prevEdges) =>
        prevEdges?.map((edge) => {
          return {
            ...edge,
            hidden: mainEdges.includes(edge) ? false : true,
          };
        })
      );
    }
  }, [hoveredNode, isShown]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodesConnectable={false}
      nodesDraggable={false}
      nodeTypes={nodeTypes}
      onNodeClick={handleNodeClick}
      onMoveEnd={handleMouseMoveEnd}
      onNodeMouseEnter={handleNodeMouseEnter}
      minZoom={0.1}
      maxZoom={3}
      className="border"
      style={{backgroundImage: `url(${galaxyImage})`}}
    />
  );
};

const ReactFlowRoadmap = ({ nodesDataList, loadNodeDetail }) => {
  const [isOpenAll, setIsOpenAll] = useState(false);
  const handleOpenAll = () => {
    setIsOpenAll((prevState) => !prevState);
  };
  return (
    <div className="w-full h-4/5 relative z-10 mt-40">
      <button onClick={handleOpenAll}>전체 열기</button>
      <ReactFlowProvider>
        <ReactFlowRoadmapComponent
          nodesDataList={nodesDataList}
          loadNodeDetail={loadNodeDetail}
          openAll={isOpenAll}
        />
        <MiniMap position="bottom-right"/>
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowRoadmap;

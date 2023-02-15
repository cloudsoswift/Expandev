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
  Panel,
} from "reactflow"; // 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import ELK from "elkjs";
import { useCallback, useEffect, useState } from "react";
import HttpWithURL from "@/utils/http";
import MainNode from "@/components/Roadmap/nodes/MainNode";
import SubNode from "@/components/Roadmap/nodes/SubNode";
import SectionNode from "@/components/Roadmap/nodes/SectionNode";
import testImage from "@/img/testimage.png";
import galaxyImage from "@/img/galaxy.jpg";
import RoadmapPanel from "./RoadmapPanel";
import { AiOutlineLoading } from "react-icons/ai";

// 커스텀 커서
import AnimatedCursor from "@/components/Roadmap/AnimatedCursor";

const NODE_SIZE = 384;
// Node Type 관련
const nodeTypes = {
  main: MainNode,
  sub: SubNode,
  section: SectionNode,
};
// Layout에 따른 노드 위치 계산을 위한 Elk Layout 설정
const elk = new ELK();
const elkLayout = (
  nodes,
  edges,
  direction = "DOWN",
  algorithm = "mrtree",
) => {
  const nodesForElk = nodes.map((node) => {
    // console.log(node);
    return {
      id: node.id,
      width: node.type === "main" ? NODE_SIZE : "68",
      height: node.type === "main" ? NODE_SIZE : "68",
    };
  });
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": algorithm,
      "elk.direction": direction,
      "nodePlacement.strategy": "SIMPLE",
      ...(algorithm === "box" && { "elk.contentAlignment": "V_CENTER" }),
      ...(algorithm === "random" && {
        "spacing.nodeNode": NODE_SIZE,
        // "randomSeed": 30,
        "randomSeed": 35,
        "aspectRatio": 1,
      }),
      ...(algorithm === "radial" && {
        "radial.radius": -90,
        "radial.wedgeCriteria": "LEAF_NUMBER",
        "radial.optimizationCriteria": "EDGE_LENGTH",
      }),
    },
    children: nodesForElk,
    edges: edges,
  };
  return elk.layout(graph);
};
const ReactFlowRoadmapComponent = ({ nodesDataList, loadNodeDetail }) => {
  // reactFlow 관련 state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clickedNode, setClickedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isShown, setIsShown] = useState(false);

  /* 로드맵 관련 state들 */
  const { setViewport, getNode, getNodes, setCenter, getZoom } = useReactFlow();

  // nodesDataList 변경시 작동하는 useEffect ============================================================================================
  useEffect(() => {
    if (!nodesDataList) return;
    console.log(nodesDataList);
    const calcWholeRoadMap = async () => {
      let initialNodes = [];
      let initialEdges = [];
      let maxX = 0;
      let maxY = 0;
      let beforeMaxX = 0;
      let beforeMaxY = 0;
      let lowestX = 0;
      let lowestY = 0;
      // depth = 0 노드( 최-상단 주제 노드 )
      const calcRoadMap = async (id) => {
        // setCenter(0 + NODE_SIZE / 2, 0 + NODE_SIZE / 2, { duration: 800, zoom: 1 });
        let presentNodes = [];
        let presentEdges = [];

        beforeMaxX = maxX;
        beforeMaxY = maxY;

        lowestX = 0;
        lowestY = 0;

        console.log(id);
        console.log(nodesDataList[id]);
        console.log("maxX, maxY ", maxX, maxY);
        let before_node = null;
        // 초기 메인 노드 순회 ============================================================
        nodesDataList[id].nodesData?.forEach((main_node) => {
          // 메인 노드를 노드 목록에 추가
          presentNodes.push({
            id: main_node.id.toString(),
            type: "main",
            data: {
              label: main_node.title,
              isComplete: main_node.isComplete,
              isEssential: main_node.isEssential,
              depth: main_node.depth,
              parentNode: before_node?.id?.toString(),
            },
            position: {
              x: beforeMaxX,
              y: beforeMaxY,
            },
            hidden: false,
          });
          // 현재 메인 노드의 하위 서브 노드 순회 =======================================================
          let before_sub_node = null;
          main_node.childs?.forEach((sub_node) => {
            // 서브 노드를 노드 목록에 추가
            presentNodes.push({
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
            // console.log(`${sub_node.id} 번째 서브 노드`,sub_node, initialNodes.at(-1));
            // 이전 서브 노드 -> 방금 추가한 서브 노드로 향하는 엣지를 엣지 목록에 추가.
            if (before_sub_node == null) {
              // 이전 서브 노드가 없는 경우 (즉 현재 메인 노드의 첫 번째 서브 노드를 막 추가한 상태)면
              // 현재 메인 노드 -> 방금 추가한 서브 노드로 향하는 엣지를 엣지 목록에 추가.
              presentEdges.push({
                id: `e${main_node.id}-${sub_node.id}`,
                data: {
                  depth: sub_node.depth,
                  parentNode: main_node.id.toString(),
                },
                source: main_node.id.toString(),
                target: sub_node.id.toString(),
                hidden: true,
                sourceHandle: "sub",
              });
              before_sub_node = presentNodes.at(-1);
              return;
            }
            presentEdges.push({
              id: `e${before_sub_node.id}-${sub_node.id}`,
              data: {
                depth: sub_node.depth,
                parentNode: main_node.id.toString(),
              },
              source: before_sub_node.id.toString(),
              target: sub_node.id.toString(),
              hidden: true,
              sourceHandle: "sub",
            });
            before_sub_node = presentNodes.at(-1);
          });
          // console.log(main_node, before_sub_node);
          // 마지막 서브 노드 -> 현재 메인 노드로 향하는 엣지를 엣지 목록에 추가.
          // presentEdges.push({
          //   id: `e${before_sub_node.id}-${main_node.id}`,
          //   data: {
          //     depth: before_sub_node.data.depth,
          //     parentNode: main_node.id.toString(),
          //   },
          //   source: before_sub_node.id.toString(),
          //   target: main_node.id.toString(),
          //   hidden: true,
          //   sourceHandle: "sub",
          // });

          // 이전 메인 노드 -> 현재 메인 노드로 향하는 엣지를 엣지 목록에 추가
          if (before_node) {
            presentEdges.push({
              id: `e${before_node.id}-${main_node.id}`,
              data: {
                depth: main_node.depth,
              },
              source: before_node.id.toString(),
              target: main_node.id.toString(),
              sourceHandle: "main",
              hidden: true,
              animated: true,
              style: { stroke: 'rgba(243, 237, 225, 50)' }
            });
          }
          // 현재 메인 노드를 이전 메인 노드로 기록
          before_node = main_node;
        });
        // console.log(initialEdges);
        // 메인 노드 = 노드 중 타입이 메인 ~id가 0 ( 최 상단) 이거나 depth 가 1~
        const mainNodes = presentNodes.filter(
          // (node) => node.id === `main-${id}` || node.data.depth === 1
          (node) => node.type === "main"
        );
        // 메인 엣지 = 엣지 중 target이 메인 노드들 중 하나의 id와 일치하는 것
        // ( = [메인 노드 id 리스트] 안에 포함된 노드 id를 target으로 하는 엣지 )
        const mainEdges = presentEdges.filter(
          (edge) =>
            mainNodes.map((node) => node.id).includes(edge.target) &&
            edge.sourceHandle === "main"
        );
        // console.log("메인 노드 및 메인 엣지",mainNodes, mainEdges);
        // 먼저 메인 노드, 엣지에 대하여 Elk를 통한 Position 계산
        const outerFunction = async () => {
          const tempFunction = async () => {
            const graph = await elkLayout(mainNodes, mainEdges, "", "random");
            console.log("1. 그래프 계산");
            console.log(graph);
            // Main Node에만 계산한 position 값 추가 반경, 이외에는 그냥 원래 노드값만.
            presentNodes = presentNodes.map((node) => {
              const calcedNode = graph.children.find((n) => n.id === node.id);
              // 계산한 값이 있고(= 메인 노드임), 부모 노드가 있는 노드(=루트 노드가 아님)
              if (calcedNode) {
                console.log(node.id, calcedNode.x, calcedNode.y);
                maxX = calcedNode.x > maxX ? calcedNode.x : maxX;
                maxY = calcedNode.y > maxY ? calcedNode.y : maxY;
                lowestX =
                  calcedNode.x - beforeMaxX < lowestX
                    ? calcedNode.x - beforeMaxX
                    : lowestX;
                lowestY =
                  calcedNode.y - beforeMaxY < lowestY
                    ? calcedNode.y - beforeMaxY
                    : lowestY;
              }
              const newNode = {
                ...node,
                // 최-상단 노드인 경우.
                // ...(calcedNode && {
                //   position: { x: beforeMaxX, y: beforeMaxY },
                //   data: {
                //     ...node.data,
                //     direction: "RIGHT",
                //   },
                // }),
                // 일반 메인 노드인 경우. 우측으로 진행중이면 양의 diff값을, 왼쪽으로 진행중이면 음의 diff값을 x 값에 지정.
                ...(calcedNode && {
                  position: {
                    x: calcedNode.x,
                    y: calcedNode.y,
                  },
                  data: {
                    ...node.data,
                    direction: "RIGHT",
                  },
                }),
              };
              // console.log(count, diff);
              return newNode;
            });
            // lowestX, lowestY 만큼 위치 보정해주고, 60% 수준으로 범위 축소.
            console.log("최소값들", id, lowestX, lowestY);
            lowestX = lowestX < 0 ? lowestX * -1 : lowestX;
            lowestY = lowestY < 0 ? lowestY * -1 : lowestY;

            presentNodes = presentNodes.map((node) => {
              const newX = node.position.x + lowestX;
              const newY = node.position.y + lowestY;
              maxX = maxX > newX ? maxX : newX;
              maxY = maxY > newY ? maxY : newY;
              return {
                ...node,
                position: {
                  x: newX,
                  y: newY,
                },
              };
            });
            maxX += NODE_SIZE;
            maxY += NODE_SIZE;
            console.log("계산 끝난 노드 ", id, presentNodes);
            // Main Edge에만 계산한 위치값(selection) 추가 반경, 이외에는 그냥 원래 노드값만.
            presentEdges = presentEdges.map((edge) => {
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
              if (mainNode.id === `main-${id}`) {
                continue;
              }
              //
              const subNodes = presentNodes.filter(
                (node) =>
                  node.id === mainNode.id ||
                  (node.parentNode === mainNode.id && node.data.depth === 2)
              );
              console.log(subNodes);
              const subEdges = presentEdges.filter(
                (edge) =>
                  edge.data?.parentNode === mainNode.id && edge.data.depth === 2
              );
              console.log(subEdges);
              // console.log(`${mainNode.id}의 서브 노드, 서브 엣지`,subNodes, subEdges);
              const subGraph = await elkLayout(
                subNodes,
                subEdges,
                "",
                "radial"
              );
              // console.log("돌았다");
              console.log(subGraph);
              // 현재 메인 노드 및 서브노드에만 계산한 position 값 추가 반경, 이외에는 그냥 원래 노드값만.
              presentNodes = presentNodes.map((node) => {
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
              presentEdges = presentEdges.map((edge) => {
                const calcedEdge = subGraph.edges.map((e) => e.id === edge.id);
                return {
                  ...edge,
                  ...(calcedEdge && { ...calcedEdge }),
                };
              });
            }
          };
          await tempFunction();
          // 각 Track별 Section 노드 추가.
          initialNodes.push({
            id: `section-${id.toString()}`,
            type: "section",
            data: {
              label: nodesDataList[id].title,
            },
            position: {
              x: beforeMaxX,
              y: beforeMaxY,
            },
            style: {
              width: maxX - beforeMaxX,
              height: maxY - beforeMaxY,
            },
            hidden: false,
            zIndex: -1,
          });
          maxX += Math.random() * 1000;
          maxY += Math.random() * 1000;
        };
        await outerFunction();
        console.log(lowestX, lowestY);
        initialNodes = [...initialNodes, ...presentNodes];
        initialEdges = [...initialEdges, ...presentEdges];
      };
      const counts = Array(nodesDataList.length)
        .fill()
        .map((n, i) => i);
      for await (let i of counts) {
        await calcRoadMap(i);
      }
      setNodes(initialNodes);
      setEdges(initialEdges);
      console.log(initialNodes);
      console.log(initialEdges);
    };
    calcWholeRoadMap();
  }, [nodesDataList]);

  const handleNodeClick = useCallback(
    (event, eventNode) => {
      // 클릭된 노드 depth가 undefined(최상단 노드) 거나 type이 section인겅우 별다른 작업 수행 X
      if (eventNode.data.depth === undefined || eventNode.type === "section") {
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
      setClickedNode(eventNode);
    },
    [loadNodeDetail, setViewport]
  );
  const handleNodeClickButton = (id) => {
    loadNodeDetail(id.toString());
  };
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

  const handleNodeMouseEnter = useCallback(
    (e, n) => {
      if (
        n.data.depth === 2 ||
        n.id === hoveredNode?.id ||
        n.type === "section"
      )
        return;
      setHoveredNode(n);
    },
    [hoveredNode]
  );
  // 클릭된 메인노드 바뀔 때 마다 해당 노드를 화면의 메인으로 설정.
  useEffect(() => {
    if (clickedNode === null) {
      return;
    }
    console.log(clickedNode);
    setCenter(
      clickedNode.positionAbsolute.x + clickedNode.width / 2,
      clickedNode.positionAbsolute.y + clickedNode.height / 2,
      {
        zoom: 1.5,
        duration: 1200,
      }
    );
    setZoomLevel(1.5);
    if (clickedNode.id !== hoveredNode?.id) {
      setHoveredNode(clickedNode);
    }
  }, [clickedNode]);

  const onSituationChange = (situation) => {
    setClickedNode(getNode(situation.id.toString()));
  };
  const onTrackChange = (trackTitle) => {
    setClickedNode(getNode(trackTitle));
  };

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
        // (node) => node.id === "0" || node.data.depth === 1
        (node) => node.type === "main" || node.type === "section"
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
      className="border border-[rgb(71,79,88)]"
      style={{
        backgroundImage: `url(${galaxyImage})`,
        // cursor: `url(${testImage}), url(${testImage}), auto`,
      }}
    >
      <AnimatedCursor />
      <RoadmapPanel
        onClickNodeButton={handleNodeClickButton}
        onSituationChange={onSituationChange}
        onTrackChange={onTrackChange}
        nodesDataList={nodesDataList}
      />
    </ReactFlow>
  );
};

const ReactFlowRoadmap = ({ loadNodeDetail }) => {
  const [nodesDataList, setNodesDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // 상황 선택될 때마다 로드맵 데이터를 가져온다
  useEffect(() => {
    let roadmapList = [];
    const getWholeRoadMap = async () => {
      const getRoadMap = async (id) => {
        setIsLoading(true);
        const response = await HttpWithURL(
          process.env.REACT_APP_ROADMAP_URL
        ).get(`track/${id}`);
        console.log(response.data);
        // setNodesDataList(prevData => [...prevData, response.data]);
        roadmapList = [...roadmapList, response.data];
      };
      for (let i = 1; i <= 3; i++) {
        await getRoadMap(i);
        // console.log(roadmapList);
      }
      setNodesDataList(roadmapList);
      setIsLoading(false);
    };
    getWholeRoadMap();
  }, []);
  return (
    <div className="w-full h-[calc(100vh-80px)] relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 text-center text-3xl -translate-x-1/2 -translate-y-1/2">
          <span className="inline">
            로딩중...
            <AiOutlineLoading className="animate-spin inline" />
          </span>
        </div>
      )}
      {!isLoading && (
        <ReactFlowProvider>
          <ReactFlowRoadmapComponent
            nodesDataList={nodesDataList}
            loadNodeDetail={loadNodeDetail}
          />
          <MiniMap position="bottom-right" />
        </ReactFlowProvider>
      )}
    </div>
  );
};

export default ReactFlowRoadmap;

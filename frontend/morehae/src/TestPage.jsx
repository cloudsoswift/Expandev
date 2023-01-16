import * as d3 from "d3";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Question from "./components/Question";
import "./style/basic.css";
//   low_level: [
//     {
//       id: 1,
//       item: {
//         id: 1,
//         title: "Internet",
//       },
//       low_level: [
//         {
//           id: 1,
//           item: {
//             id: 2,
//             title: "How does the internet work?",
//           },
//           priority: 1,
//           top_level: 1,
//         },
//         {
//           id: 2,
//           item: {
//             id: 3,
//             title: "What is HTTP?",
//           },
//           priority: 2,
//           top_level: 1,
//         },
//         {
//           id: 3,
//           item: {
//             id: 4,
//             title: "Browsers and how they work?",
//           },
//           priority: 3,
//           top_level: 1,
//         },
//       ],
//       priority: 1,
//       top_level: 0,
//     },
//     {
//       id: 2,
//       item: {
//         id: 5,
//         title: "Learn a Language",
//       },
//       low_level: [
//         {
//           id: 4,
//           item: {
//             id: 6,
//             title: "Java",
//           },
//           priority: 1,
//           top_level: 2,
//         },
//         {
//           id: 5,
//           item: {
//             id: 7,
//             title: "Python",
//           },
//           priority: 2,
//           top_level: 2,
//         },
//       ],
//       priority: 2,
//       top_level: 1,
//     },
//   ],
//   title: "Backend",
// };
const TestPage = () => {
  const roadmapRef = useRef();
  const treeData = [
    {
      id: "0",
      title: "Backend",
      parent: "",
    },
    {
      id: "1",
      title: "Internet",
      parent: "0",
    },
    {
      id: "2",
      title: "How does the internet work?",
      parent: "1",
    },
    {
      id: "3",
      title: "What is HTTP?",
      parent: "1",
    },
    {
      id: "4",
      title: "Browsers and how they work?",
      parent: "1",
    },
    {
      id: "5",
      title: "Learn a Language",
      parent: "1",
    },
    {
      id: "6",
      title: "Java",
      parent: "5",
    },
    {
      id: "7",
      title: "Python",
      parent: "5",
    },
  ];
  const margin = { top: 20, right: 90, bottom: 20, left: 90 };
  const width = 960;
  const height = 500;
  // const chart = d3.select(roadmapRef.current);
  useEffect(() => {
    console.log(roadmapRef);
    const svg = d3.select(roadmapRef.current);
    console.log(svg);
    svg.append("g")
    .attr("width", width)
      .attr("height", height)
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      console.log(svg);
    const stratify = d3
      .stratify()
      .id((d) => d.id)
      .parentId((d) => d.parent);
    const rootNode = stratify(treeData);
    const tree = d3.tree().size([width, height]);
    const treeRoot = tree(rootNode);

    const edges = svg.append("g").selectAll("path").data(rootNode.links());
    // edges.enter().append("path").attr("d", (d)=>`M${d.source.x},${d.source.y} v 50 H${d.target.x}`)
    const rects = svg.append("g").selectAll("rect").data(treeRoot.descendants())
    .join(enter => enter.append("rect").attr("x", d=>d.x).attr("y", d=>d.y).attr("fill","green"), update => update.attr("class", "updated") , exit => exit.remove(),);
    rects.enter().append("rect").attr("x", d=>d.x).attr("y", d=>d.y);
    const names = svg.append("g").selectAll("text").data(treeRoot.descendants());
    names.enter().append("text").text(d=>d.data.title).attr("x", d=>d.x+40).attr("y", d=>d.y+40).classed("bigger", true);
    // treeRoot.x = height / 2;
    // treeRoot.y = 0;
    console.log(treeRoot.descendants());
    console.log(roadmapRef.current);
  }, []);
  return (
    <div className="container mx-auto min-h-screen h-full bg-gradient-to-b from-cyan-50 to-blue-500">
      <div className="service-inform grid grid-flow-row auto-rows-auto pt-40">
        <div className="justify-self-center h-10 w-full text-center text-4xl mb-8">
          개발자 로드맵. 여기에서 시작하세요.
        </div>
        <div className="justify-self-center h-10 w-full text-center text-2xl">
          당신을 위한 가이드
        </div>
        <div className="justify-self-center h-10 w-full text-center mb-32">
          <button className="border-none rounded-lg px-32 py-4 text-4xl text- bg-white/70">
            시작하기
          </button>
        </div>
      </div>
      <div className="question-list grid auto-rows-max">
        <div className="roadmap-inform grid grid-flow-row grid-cols-2 auto-rows-auto mt-10 mx-5 gap-32">
          <Question />
          <Question />
        </div>
        <div className="roadmap-inform grid grid-flow-row grid-cols-2 auto-rows-auto mt-10 mx-5 gap-32">
          <Question />
          <Question />
        </div>
      </div>
      <div className="feature-inform"></div>
      <svg className="mt-10" width={width} height={height} ref={roadmapRef} />
    </div>
  );
};

export default TestPage;

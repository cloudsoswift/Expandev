import QuestionItem from "./QuestionItem";
import { useEffect, useRef } from "react";

const DUMMY_DATA = [
  {
    id: 1,
    question: "웹 페이지는 어떻게 만드는 걸까?",
    link: "/roadmap",
  },
  {
    id: 2,
    question: "모바일 앱을 만들고 싶은데..",
    link: "/roadmap",
  },
  {
    id: 3,
    question: "어떻게 하면 배포를 편하게 할까?",
    link: "/roadmap",
  },
  {
    id: 4,
    question: "프론트엔드 개발자가 되기위한 사전지식은 뭘까?",
    link: "/roadmap",
  },
  {
    id: 5,
    question: "지금 내가 공부한게 얼마나 잘 공부된 것인지 알 수 있을까??",
    link: "/roadmap",
  },
  {
    id: 6,
    question: "지금 어떤 수준인지 알고싶어...",
    link: "/roadmap",
  },
  {
    id: 7,
    question: "이제 뭘 해야하지??",
    link: "/roadmap",
  },
];

const QuestionList = () => {
  const targets = useRef([]);
  useEffect(() => {
    if (targets?.current && targets.current.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // 화면에 등장할 때의 동작을 정의
          // console.log(entry.target.classList);
          if (entry.isIntersecting) {
            entry.target.classList.replace('opacity-0', 'opacity-100');
          } else {
            entry.target.classList.replace('opacity-100', 'opacity-0');
          }
        })
      })
      targets.current.forEach(el => observer.observe(el))
    }
  }, [])
  
  const addToTargets = (el) => {
    targets.current.push(el);
  }

  return (
    // <div className="grid grid-flow-row grid-cols-1 auto-rows-auto my-10 mx-5 gap-16">
    <div className="px-48 mt-14">
      {DUMMY_DATA.map((data) => (
        <QuestionItem data={data} key={data.id} ref={(el) => addToTargets(el)} />
      ))}
    </div>
  );
};

export default QuestionList;
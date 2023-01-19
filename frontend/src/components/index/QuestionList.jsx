import QuestionItem from "./QuestionItem";

const DUMMY_DATA = [
  {
    question: "웹 페이지는 어떻게 만드는 걸까?",
    link: "",
    img: require("../../img/confused.png"),
  },
  {
    question: "모바일 앱을 만들고 싶은데..",
    link: "",
    img: require("../../img/confused.png"),
  },
  {
    question: "어떻게 하면 배포를 편하게 할까?",
    link: "",
    img: require("../../img/confused.png"),
  },
  {
    question: "프론트엔드 개발자가 되기위한 사전지식은 뭘까?",
    link: "",
    img: require("../../img/confused.png"),
  },
];

const QuestionList = () => {
  return (
    <div className="question-list roadmap-inform grid grid-flow-row grid-cols-2 auto-rows-auto mt-10 mx-5 gap-32">
      {DUMMY_DATA.map((data) => (
        <QuestionItem data={data} />
      ))}
    </div>
  );
};

export default QuestionList;

import QuestionItem from "@/components/Index/QuestionItem";

const DUMMY_DATA = [
  {
    id: 1,
    question: "웹 페이지는 어떻게 만드는 걸까?",
    link: "",
  },
  {
    id: 2,
    question: "모바일 앱을 만들고 싶은데..",
    link: "",
  },
  {
    id: 3,
    question: "어떻게 하면 배포를 편하게 할까?",
    link: "",
  },
  {
    id: 4,
    question: "프론트엔드 개발자가 되기위한 사전지식은 뭘까?",
    link: "",
  },
];

const QuestionList = () => {
  return (
    <div className="question-list roadmap-inform grid grid-flow-row grid-cols-1 auto-rows-auto my-10 mx-5 gap-16">
      {DUMMY_DATA.map((data) => (
        <QuestionItem data={data} key={data.id} />
      ))}
    </div>
  );
};

export default QuestionList;

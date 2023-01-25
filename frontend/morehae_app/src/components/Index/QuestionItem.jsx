import { Link } from "react-router-dom";

/*
 * -받을것으로 생각하는 props 구조-
 * data {
 *   link: 질문 말풍선을 클릭했을때 이동할 링크
 *   question: 질문 말풍선에 띄울 내용
 * }
 */

const QuestionItem = (props) => {
  return (
    <div
      className={`${
        props.data.id % 2 === 0 ? "justify-self-start" : "justify-self-end"
      } h-full w-2/3 text-center text-2xl grid`}
    >
      <Link
        className={`chat-bubble border-2 p-8 rounded-3xl ${props.data.id % 2 === 0 ? "rounded-bl-none" : "rounded-br-none"} shadow-md bg-white`}
        to={props.data.link}
      >
        {props.data.question}
      </Link>
    </div>
  );
};

export default QuestionItem;

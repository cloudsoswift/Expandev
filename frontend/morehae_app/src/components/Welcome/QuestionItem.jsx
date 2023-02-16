import React from "react";
import { Link } from "react-router-dom";

/*
 * -받을것으로 생각하는 props 구조-
 * data {
 *   link: 질문 말풍선을 클릭했을때 이동할 링크
 *   question: 질문 말풍선에 띄울 내용
 * }
 */
const QuestionItem = ({data}, ref) => {
  return (
    <div
      className={`flex ${
        data.id % 2 === 0 ? "justify-start" : "justify-end"
      } h-full text-center text-xl transition-opacity duration-[1500ms] opacity-0`}
      ref={ref}
    >
      <Link
        className={`p-8 rounded-3xl ${data.id % 2 === 0 ? "rounded-bl-none" : "rounded-br-none"} shadow-md bg-blue-800 `}
        to={data.link}
      >
        {data.question}
      </Link>
    </div>
  );
};

const forwardedRefItem = React.forwardRef(QuestionItem);
export default forwardedRefItem;
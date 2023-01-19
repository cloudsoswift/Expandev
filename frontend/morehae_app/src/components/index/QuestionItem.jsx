import { Link } from "react-router-dom";

/*
* -받을것으로 생각하는 props 구조-
* data {
*   link: 질문 말풍선을 클릭했을때 이동할 링크
*   question: 질문 말풍선에 띄울 내용
*   img: 질문 말풍선 우측하단에 띄울 인물? 사진 위치
* }
*/

const QuestionItem = (props) => {
  return (
    <div className="justify-self-center h-full w-full text-center text-2xl grid">
      <Link className="border-2 w-2/3 p-4 rounded-lg shadow-md bg-white" to={props.data.link}>
        {props.data.question}
      </Link>
      <div className="justify-self-end border-2 w-32 h-32 mt-4 bg-white">
        <img className="align-middle rounded-xl" alt="confused person" src={props.data.img} />
        {/* <img className="align-middle rounded-xl" alt="confused person" src={require("../../img/confused.png")} /> */}
      </div>
    </div>
  );
};

export default QuestionItem;

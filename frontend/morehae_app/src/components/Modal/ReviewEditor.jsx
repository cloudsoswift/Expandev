
import React, {  useRef, useState } from "react";
// import { FaStar } from "react-icons/fa";



const ReviewEditor = ({ onCreate }) => {
  const contentInput = useRef();

  const [state, setState] = useState({
    user: "",
    content: "",
    importance: 5,
    difficulty: 5,
  });

  


  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = (e) => {
    if (state.content.length < 5) {
      contentInput.current.focus();
      alert("5글자 이상 입력해주세요")
      return
    }
    onCreate(state.user, state.content, state.importance, state.difficulty);
    console.log(state);
    alert("작성 완료");
    setState({
      user: "",
      content: "",
      importance: 5,
      difficulty: 5,
    });
  };

  return (
    <div className="p-3 bg-slate-100">
      <h2 className="mb-2">리뷰 작성</h2>

      
      <div className="mb-1">
        <span>중요도</span>
        <select
          name="importance"
          value={state.importance}
          onChange={handleChangeState}
          className="mx-2 rounded-md"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div className="mb-2">
        <span>난이도</span>
        <select
          name="difficulty"
          value={state.difficulty}
          onChange={handleChangeState}
          className="mx-2 rounded-md"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <input
          name="user"
          placeholder="이름"
          value={state.user}
          onChange={handleChangeState}
          className=" rounded-md p-1 mb-3 w-[100px] text-sm"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          placeholder="내용"
          value={state.content}
          onChange={handleChangeState}
          className="rounded-md p-1 mb-3 w-full h-[100px] text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs"
        >
          저장
        </button>
      </div>

    </div>
  );
};

export default ReviewEditor;

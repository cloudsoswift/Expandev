import React, { useRef, useState } from "react";

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
    <div className="border-solid border-2 p-2 bg-slate-200">
      <h2>리뷰 작성</h2>
      <div className="mb-3">
        <span>중요도</span>
        <select
          name="importance"
          value={state.importance}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="mb-3">
        <span>난이도</span>
        <select
          name="difficulty"
          value={state.difficulty}
          onChange={handleChangeState}
          className=""
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
          className="mb-3 w-[100px]"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          placeholder="내용"
          value={state.content}
          onChange={handleChangeState}
          className="mb-3 w-[500px] h-[100px]"
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="p-1 bg-blue-200 cursor-pointer"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ReviewEditor;

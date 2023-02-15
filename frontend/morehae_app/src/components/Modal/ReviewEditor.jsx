import React, { useRef, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReviewEditor = ({ onCreate }) => {
  const contentInput = useRef();

  const [imClicked, setImClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [diClicked, setDiClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [state, setState] = useState({
    content: "",
  });

  const userInfo = useSelector((state) => state.user.user);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.content.length < 5) {
      contentInput.current.focus();
      alert("5글자 이상 입력해주세요");
      return;
    }
    if (!userInfo.nickname) {
      alert("리뷰를 작성하려면 로그인해주세요");
      return;
    }
    onCreate(state.content, state.importance, state.difficulty);
    // 변경된것, 아직 create 결과에 따라 state관련 삭제할지 if 걸어야 함
    setImClicked([false, false, false, false, false]);
    setDiClicked([false, false, false, false, false]);
    setState({
      content: "",
    });
  };

  // importance
  const ARRAY1 = [0, 1, 2, 3, 4];

  const handleImStarClick = (idx) => {
    let clickStates = [...imClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= idx ? true : false;
    }
    setImClicked(clickStates);
  };

  useEffect(() => {
    sendImportance();
    // eslint-disable-next-line
  }, [imClicked]);

  const sendImportance = () => {
    let importanceScore = imClicked.filter(Boolean).length;
    // console.log(importanceScore, "importance");
    setState({ ...state, importance: importanceScore });
  };

  // difficulty
  const ARRAY2 = [0, 1, 2, 3, 4];

  const handleDiStarClick = (idx) => {
    let clickStates = [...diClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= idx ? true : false;
    }
    setDiClicked(clickStates);
  };

  useEffect(() => {
    sendDifficulty();
    // eslint-disable-next-line
  }, [diClicked]);

  const sendDifficulty = () => {
    let difficultyScore = diClicked.filter(Boolean).length;
    // console.log(difficultyScore, "difficulty" );
    setState({ ...state, difficulty: difficultyScore });
  };

  return (
    <div>
      <div className=" bg-[rgb(36,41,47)] rounded-lg p-2 mb-5 drop-shadow-lg">
        {/* <h2 className="mb-2 text-white">리뷰 작성</h2> */}

        <div className="flex mb-1">
          <div className="flex mb-1 mr-3">
            <span className="mr-2 mt-0.5 text-white text-xs">중요도</span>
            {ARRAY1.map((el, idx) => {
              return (
                <FaStar
                  key={idx}
                  onClick={() => handleImStarClick(el)}
                  className={
                    imClicked[el]
                      ? " text-yellow-300 text-md cursor-pointer"
                      : " text-gray-200 text-md cursor-pointer"
                  }
                />
              );
            })}
          </div>
          <div className="flex mb-1">
            <span className="mr-2 mt-0.5 text-xs text-white">난이도</span>
            {ARRAY2.map((el, idx) => {
              return (
                <FaStar
                  key={idx}
                  onClick={() => handleDiStarClick(el)}
                  className={
                    diClicked[el]
                      ? " text-yellow-300 text-md cursor-pointer"
                      : " text-gray-200 text-md cursor-pointer"
                  }
                />
              );
            })}
          </div>
        </div>

        <div>
          {/* <input
          name="user"
          placeholder="이름"
          value={state.user}
          onChange={handleChangeState}
          className=" rounded-md p-1 mb-3 w-[100px] text-sm"
        /> */}
        </div>
        <div>
          <textarea
            ref={contentInput}
            name="content"
            placeholder="5자 이상 작성해주세요"
            value={state.content}
            onChange={handleChangeState}
            className="rounded-md p-2 mb-1 w-full h-[80px] text-sm bg-[rgb(32,37,42)] text-white shadow-inner"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded-md bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] cursor-pointer text-[rgb(131,132,139)] text-xs hover:text-green-500 drop-shadow-md border-2 hover:border-green-500 border-[rgb(131,132,139)] ease-in-out duration-300"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEditor;

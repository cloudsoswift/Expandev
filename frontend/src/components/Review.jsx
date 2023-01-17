import React, { useState, useRef } from "react";
import ReviewEditor from "./ReviewEditor";
import ReviewList from "./ReviewList";

const dummyList = [
  {
    id: 1,
    user: 23,
    content: "초보자에게 딱인듯",
    importance: 3,
    difficulty: 2,
    created_date: 1671364299923,
  },
  {
    id: 2,
    user: 27,
    content: "어려워요",
    importance: 3,
    difficulty: 2,
    created_date: 1671364300000,
  },
  {
    id: 3,
    user: 21,
    importance: 5,
    difficulty: 2,
    created_date: 1671366310000,
  },
  {
    id: 4,
    user: 20,
    content: "오늘 시작해요",
    importance: 3,
    difficulty: 1,
    created_date: 1671384300000,
  },
  {
    id: 5,
    user: 24,
    content: "3개월째 정체중",
    importance: 2,
    difficulty: 2,
    created_date: 1671394299923,
  },
  {
    id: 6,
    user: 12,
    content: "초보자에게 딱인듯",
    importance: 4,
    difficulty: 5,
    created_date: 1671464299923,
  },
];

const Review = () => {
  const [data, setData] = useState(dummyList);
  const dataId = useRef(0);
  const onCreate = (user, content, importance, difficulty) => {
    const created_date = new Date().getTime();
    const newItem = {
      user,
      content,
      importance,
      difficulty,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const afterDeleteList = data.filter((item)=>item.id !== targetId)
    setData(afterDeleteList)
  }


  const onEdit = (targetId, newContent)=> {
    setData(data.map((item)=>item.id === targetId ? {...item, content: newContent} : item))
  }
  return (
    <div>
      <ReviewList reviewList={data} onDelete={onDelete} onEdit={onEdit}/>
      <ReviewEditor onCreate={onCreate} />
    </div>
  );
};

export default Review;

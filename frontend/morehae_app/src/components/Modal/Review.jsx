import React, { useState, useRef } from "react";
import ReviewEditor from "@/components/Modal/ReviewEditor";
import ReviewList from "@/components/Modal/ReviewList";

const Review = ({ reqData }) => {
  const [data, setData] = useState(reqData.review);
  const dataId = useRef(reqData.review.length + 1);
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
    const afterDeleteList = data.filter((item) => item.id !== targetId);
    setData(afterDeleteList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div>
      <div className="border-2 rounded-md">
        <ReviewList reviewList={data} onDelete={onDelete} onEdit={onEdit} />
        <ReviewEditor onCreate={onCreate} />
      </div>
    </div>
  );
};

export default Review;

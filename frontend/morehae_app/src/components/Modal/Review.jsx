import React, { useState, useRef } from "react";
import ReviewEditor from "@/components/Modal/ReviewEditor";
import ReviewList from "@/components/Modal/ReviewList";
import axios from "axios";

const Review = ({ reqData, nodeId }) => {
  const [data, setData] = useState(reqData.review);
  const dataId = useRef(reqData.review.length + 1);

  const onCreate = (user, content, importance, difficulty) => {
    axios({
      url: "http://i8d212.p.ssafy.io:8000/roadmaps/review",
      method: "post",
      data: { node: nodeId, content, importance, difficulty },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    if(window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
    axios({
      url: `http://i8d212.p.ssafy.io:8000/roadmaps/review/${targetId}`,
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        alert("리뷰가 삭제되었습니다");
      })
      .catch((err) => console.log(err));
    }
    // 일단 바로 삭제 되도록
    const afterDeleteList = data.filter((item) => item.id !== targetId);
    setData(afterDeleteList);
  };

  const onEdit = (targetId, newContent, importance, difficulty) => {
    axios({
      url: `http://i8d212.p.ssafy.io:8000/roadmaps/review/${targetId}`,
      method: "put",
      data: { node: nodeId, content: newContent, importance, difficulty },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // 일단 바로 수정 되도록
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

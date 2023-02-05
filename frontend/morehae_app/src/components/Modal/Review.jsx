import React, { useState, useRef } from "react";
import ReviewEditor from "@/components/Modal/ReviewEditor";
import ReviewList from "@/components/Modal/ReviewList";
// import axios from "axios";
import httpWithURL from "../../utils/http";

const Review = ({ reqData, nodeId }) => {
  const [data, setData] = useState(reqData.review);
  const dataId = useRef(reqData.review.length + 1);

  const onCreate = ( content, importance, difficulty) => {
    const created_date = new Date().getTime();
    const newItem = {

      content,
      importance,
      difficulty,
      created_date,
      id: dataId.current,
    };
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(
        "review",
        { node: nodeId, content, importance, difficulty },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // 생성 즉시 반영
    setData([...data, newItem]);
  };

  const onDelete = (targetId) => {
    if (window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
      httpWithURL(process.env.REACT_APP_ROADMAP_URL)
        .delete(`review/${targetId}`, { withCredentials: true })
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
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .put(
        `review/${targetId}`,
        { node: nodeId, content: newContent, importance, difficulty },
        { withCredentials: true }
      )
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
      <div >
        <ReviewList reviewList={data} onDelete={onDelete} onEdit={onEdit} />
        <ReviewEditor onCreate={onCreate} />
      </div>
    </div>
  );
};

export default Review;

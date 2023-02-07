import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewEditor from "@/components/Modal/ReviewEditor";
import ReviewList from "@/components/Modal/ReviewList";
import httpWithURL from "../../utils/http";

const Review = ({ reqData, nodeId }) => {
  const [data, setData] = useState(reqData.review);
  // const dataId = useRef(reqData.review.length + 1);
  const [likedUser, setLikedUser] = useState(false);

  const userInfo = useSelector((state) => state.user.user);

  const onCreate = (content, importance, difficulty) => {
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(
        "review",
        { node: nodeId, content, importance, difficulty },
        { withCredentials: true }
      )
      .then((res) => {
        const newItem = {
          user: userInfo.nickname,
          content: res.data.content,
          importance: res.data.importance,
          difficulty: res.data.difficulty,
          created_at: res.data.created_at,
          id: res.data.id,
          user_profile_image: res.data.user_profile_image,
        };
        setData([ ...data, newItem ]);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = (targetId) => {
    if (window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
      httpWithURL(process.env.REACT_APP_ROADMAP_URL)
        .delete(`review/${targetId}`, { withCredentials: true })
        .then((res) => {
          // console.log(res);
          alert("리뷰가 삭제되었습니다");
          // 즉시 삭제
          const afterDeleteList = data.filter((item) => item.id !== targetId);
          setData(afterDeleteList);
        })
        .catch((err) => console.log(err));
    }
  };

  const onEdit = (targetId, newContent, importance, difficulty) => {
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .put(
        `review/${targetId}`,
        { node: nodeId, content: newContent, importance, difficulty },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        // 즉시 수정
        setData(
          data.map((item) =>
            item.id === targetId ? { ...item, content: newContent } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };


    // useEffect(()=>{
    //   const upDateLike = async ()=> {
    //     const res = likedUser
    //   }
    // },[])

  const reviewLike = (targetId) => {
    console.log(targetId)
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(`review/${targetId}/like`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLikedUser(()=> !likedUser);
        console.log(likedUser, "likedUser state");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <ReviewList
          reviewList={data}
          onDelete={onDelete}
          onEdit={onEdit}
          likedUser={likedUser}
          reviewLike={reviewLike}
        />
        <ReviewEditor onCreate={onCreate} />
      </div>
    </div>
  );
};

export default Review;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewList from "@/components/Modal/ReviewList";
import httpWithURL from "../../utils/http";

const Review = ({ reqData, nodeId }) => {
  const [data, setData] = useState(reqData.review);
  const userInfo = useSelector((state) => state.user.user);

  const onCreate = (content, importance, difficulty) => {
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(
        "review",
        { node: nodeId, content, importance, difficulty },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        const newItem = {
          ...res.data,
          user: userInfo.nickname,
        };
        alert("리뷰가 작성되었습니다");
        setData((prevData) => [...prevData, newItem]);
      })
      .catch((err) => {
        // console.log(err);
        alert("서버와 통신중 에러가 발생했습니다.");
      });
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
        .catch((err) => {
          // console.log(err);
        });
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
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    setData(reqData.review);
  }, [reqData.review]);

  const reviewLike = (targetId) => {
    httpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .post(`review/${targetId}/like`, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        setData((prevData) => {
          // 좋아요를 누른 리뷰를 찾아서
          const originalReview = prevData.find((r) => r.id === targetId);
          // 해당 리뷰를 좋아요한 유저 중에 현재 로그인한 유저가 있다면,
          // true : 현재 로그인한 유저를 제외한 like_user의 필터링 / false : 해당 리뷰를 좋아요한 유저에 그 유저를 새로 넣어줌
          let newLike_users = originalReview.like_users.includes(userInfo.id)
            ? originalReview.like_users.filter(
                (like_user) => like_user !== userInfo.id
              )
            : [...originalReview.like_users, userInfo.id];

          return prevData.map((review) =>
            review.id === targetId
              ? { ...review, like_users: newLike_users }
              : review
          );
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <div>
        <ReviewList
          reviewList={data}
          onDelete={onDelete}
          onEdit={onEdit}
          reviewLike={reviewLike}
          userInfo={userInfo}
          onCreate={onCreate}
        />
      </div>
    </div>
  );
};

export default Review;

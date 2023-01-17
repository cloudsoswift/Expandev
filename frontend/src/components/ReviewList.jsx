import React from "react";
import ReviewListItem from "./ReviewListItem";

const ReviewList = ({ reviewList, onDelete, onEdit }) => {
  
  const getAvgImp = (reviewList) => {
    if (reviewList.length === 0) return 0;
    let sum = 0;
    reviewList.forEach((item) => {
      sum += item.importance;
    });
    console.log(sum)
    return Math.round(sum / reviewList.length);
  };

  const getAvgDif = (reviewList) => {
    if (reviewList.length === 0) return 0;
    let sum = 0;
    reviewList.forEach((item) => {
      sum += item.difficulty;
    });
    return Math.round(sum / reviewList.length);
  };

  return (
    <div className="bg-blue-300 p-3">
      <div>
        <div>REVIEW</div>

        <div>전체 중요도 | {getAvgImp(reviewList)}</div>
        <div>전체 난이도 | {getAvgDif(reviewList)}</div>

        <div>
          {reviewList.map((item) => (
            <ReviewListItem
              key={item.id}
              {...item}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;

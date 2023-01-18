import React from "react";
import ReviewListItem from "./ReviewListItem";

const ReviewList = ({ reviewList, onDelete, onEdit }) => {
  
  const getAvgImp = (list) => {
    if (list.length === 0) return 0;
    let sum = 0;
    list.forEach((item) => {
      sum += parseInt(item.importance);
    });
    return Math.round(sum / list.length);
  };

  const getAvgDif = (list) => {
    if (list.length === 0) return 0;
    let sum = 0;
    list.forEach((item) => {
      sum += parseInt(item.difficulty);
    });
    return Math.round(sum / list.length);
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

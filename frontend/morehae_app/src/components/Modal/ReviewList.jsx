import React from "react";
import ReviewListItem from "@/components/Modal/ReviewListItem";
import { FaStar } from "react-icons/fa";

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

  console.log(reviewList)
  return (
    <div className=" bg-white p-3">
      <div>
        <div>REVIEW</div>

        <div className="mt-2 text-sm flex">
          <span className="mr-1 ">전체 중요도 |</span>
          {Array.from({ length: getAvgImp(reviewList) }, (v, idx) => (
            <FaStar key={idx} className="text-sm text-yellow-300 mt-0.5" />
          ))}
          {Array.from({ length: 5 - getAvgImp(reviewList) }, (v, idx) => (
            <FaStar key={idx} className="text-sm text-gray-300 mt-0.5" />
          ))}
        </div>
        <div className="mb-2 text-sm flex">
          <span className="mr-1 ">전체 난이도 |</span>
          {Array.from({ length: getAvgDif(reviewList) }, (v, idx) => (
            <FaStar key={idx} className="text-sm text-yellow-300 mt-0.5" />
          ))}
          {Array.from({ length: 5 - getAvgDif(reviewList) }, (v, idx) => (
            <FaStar key={idx} className="text-sm text-gray-300 mt-0.5" />
          ))}
        </div>

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

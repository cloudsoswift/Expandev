import React from "react";
import ReviewListItem from "@/components/Modal/ReviewListItem";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviewList, onDelete, onEdit, reviewLike, likedUser }) => {

  console.log(reviewList)
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
    <div className="px-3 pt-3 drop-shadow-lg">
      <div className=" bg-[rgb(48,54,61)] p-3 rounded-t-lg">
        <div>
          <div className="text- mt-2 mb-5 text-white  ">REVIEW</div>
          <div className="flex">
            <div className="mr-2 mb-2 text-sm flex">
              <span className="text-white mr-1 ">중요도</span>
              {Array.from({ length: getAvgImp(reviewList) }, (v, idx) => (
                <FaStar key={idx} className="text-sm text-yellow-300 mt-0.5" />
              ))}
              {Array.from({ length: 5 - getAvgImp(reviewList) }, (v, idx) => (
                <FaStar key={idx} className="text-sm text-gray-300 mt-0.5" />
              ))}
            </div>
            <div className="mr-2 mb-2 text-sm flex">
              <span className="text-white mr-1">난이도</span>
              {Array.from({ length: getAvgDif(reviewList) }, (v, idx) => (
                <FaStar key={idx} className="text-sm text-yellow-300 mt-0.5" />
              ))}
              {Array.from({ length: 5 - getAvgDif(reviewList) }, (v, idx) => (
                <FaStar key={idx} className="text-sm text-gray-300 mt-0.5" />
              ))}
            </div>
          </div>

          <div className="bg-[rgb(32,37,42)] py-2 rounded-lg drop-shadow-lg">
            {reviewList.map((item) => (
              <ReviewListItem
                key={item.id}
                {...item}
                onDelete={onDelete}
                onEdit={onEdit}
                reviewLike={reviewLike}
                likedUser={likedUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;

import React from "react";
import ReviewListItem from "@/components/Modal/ReviewListItem";
import { FaStar } from "react-icons/fa";
import ReviewEditor from "@/components/Modal/ReviewEditor";

const ReviewList = ({
  reviewList,
  onDelete,
  onEdit,
  reviewLike,
  userInfo,
  onCreate,
}) => {

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
          <div className="mb-5">
            <ReviewEditor onCreate={onCreate} />
            <div className="border-b-2 border-[rgb(71,79,88)] p-3 ">
              <div className="text-sm mb-2 text-[rgb(161,173,185)]">총 {reviewList?.length}개</div>
              <div className="flex">
                <div className="mr-2 mb-2 text-sm flex ">
                  <span className="text-white mr-1 ">전체 중요도</span>
                  {Array.from({ length: getAvgImp(reviewList) }, (v, idx) => (
                    <FaStar
                      key={idx}
                      className="text-sm text-yellow-300 mt-0.5"
                    />
                  ))}
                  {Array.from(
                    { length: 5 - getAvgImp(reviewList) },
                    (v, idx) => (
                      <FaStar
                        key={idx}
                        className="text-sm text-gray-300 mt-0.5"
                      />
                    )
                  )}
                </div>
                <div className="mr-2 mb-2 text-sm flex">
                  <span className="text-white mr-1 ml-2">전체 난이도</span>
                  {Array.from({ length: getAvgDif(reviewList) }, (v, idx) => (
                    <FaStar
                      key={idx}
                      className="text-sm text-yellow-300 mt-0.5"
                    />
                  ))}
                  {Array.from(
                    { length: 5 - getAvgDif(reviewList) },
                    (v, idx) => (
                      <FaStar
                        key={idx}
                        className="text-sm text-gray-300 mt-0.5"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {reviewList.length > 0 ? (
            <div className="py-2 rounded-lg drop-shadow-lg">
              {reviewList.map((item) => (
                <ReviewListItem
                  key={item.id}
                  {...item}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  reviewLike={reviewLike}
                  userInfo={userInfo}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[rgb(32,37,42)] p-2 rounded-lg drop-shadow-lg text-sm text-[rgb(161,173,185)]">
              작성된 리뷰가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;

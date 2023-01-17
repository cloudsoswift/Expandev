import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ReviewListItem = ({
  onDelete,
  onEdit,

  id,
  user,
  content,
  created_date,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const [localContent, setLocalContent] = useState(content);

  const afterQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = ()=>{
    onEdit(id, localContent)
    toggleIsEdit()
  }


  return (
    <div>
      <div className="bg-blue-200 mb-3 p-3">
        <div className="flex justify-between">
          <div className="text-sm">{user}</div>
          <BsThreeDotsVertical />
        </div>
        <div className="text-xs py-1">
          {id}
          작성일자 {new Date(created_date).toLocaleString()}
        </div>
        {isEdit ? (
          <div>
            <span onClick={afterQuitEdit} className="border-4">수정 취소</span>
            <span onClick={handleEdit} className="border-4">수정 완료</span>
          </div>
        ) : (
          <div>
            <span onClick={handleDelete} className="border-4">Delete</span>
            <span onClick={toggleIsEdit} className="border-4">UpdateMode</span>
          </div>
        )}




        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
};

export default ReviewListItem;

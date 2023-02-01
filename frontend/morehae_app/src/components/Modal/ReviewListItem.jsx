import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { Menu } from "@headlessui/react";

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

  const handleEdit = () => {
    onEdit(id, localContent);
    toggleIsEdit();
  };

  return (
    <div>
      <div className="rounded border-2 mb-3 p-3">
        <div className="flex justify-between">
          <div className="text-sm ">{user}</div>
          <div className="relative">
            <Menu>
              <Menu.Button>
                <BsThreeDotsVertical />
              </Menu.Button>
              <Menu.Items className="absolute bg-white w-14 rounded-md mt-2 flex flex-col focus:outline-none py-1 border z-50">
                <Menu.Item className="grid justify-center items-center h-full border m-1">
                  <span className="text-xs" onClick={toggleIsEdit}>
                    수정
                  </span>
                </Menu.Item>
                <Menu.Item className="grid justify-center items-center h-full border m-1">
                  <span className="text-xs" onClick={handleDelete}>
                    삭제
                  </span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        <div className="text-xs py-1">
          {/* {id} */}
          {user}
           | 작성일자 {new Date(created_date).toLocaleString()}
          {/* <span><FaRegHeart /></span> */}
        </div>

        {isEdit ? (
          <>
            <textarea
              className="w-full border-md border-2"
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}

        {isEdit ? (
          <div className="flex justify-end">
            <span
              onClick={afterQuitEdit}
              className="mx-2 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs"
            >
              취소
            </span>
            <span
              onClick={handleEdit}
              className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs"
            >
              완료
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewListItem;

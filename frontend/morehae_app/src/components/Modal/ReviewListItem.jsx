import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import { Menu } from "@headlessui/react";

const ReviewListItem = ({
  onDelete,
  onEdit,

  id,
  user,
  content,
  created_at,
  user_profile_image,
  like_users,
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

  console.log(user_profile_image);

  return (
    <div>
      <div className="rounded border-2 mb-3 p-3">
        <div className="grid grid-cols-5">
          <div className="col-span-1 flex ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOXESdHIQO3wJZ2Ct7hu56W7k2s_Li3SYXyqYvNJ0SOSxRAL7xKVswcUCAOJXTJWsMTI&usqp=CAU"
              alt="img"
              className="w-16 h-16 rounded-full mt-2 mx-2"
            />
          </div>

          <div className="col-span-4">
            <div className="flex justify-between">
              <div className="text-sm">{user}</div>
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
                <div className="text-xs">
                  <FaHeart />
                  {like_users}
                </div>
              </div>
            </div>
            <div className="text-xs py-1 text-gray-500">
              작성일자 {new Date(created_at).toLocaleString()}
            </div>

            {isEdit ? (
              <>
                <textarea
                  className="w-full border-md border-2 text-sm"
                  value={localContent}
                  onChange={(e) => setLocalContent(e.target.value)}
                ></textarea>
              </>
            ) : (
              <div className="text-sm">{content}</div>
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
      </div>
    </div>
  );
};

export default ReviewListItem;

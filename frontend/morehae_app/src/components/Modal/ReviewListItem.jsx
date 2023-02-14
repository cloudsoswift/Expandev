import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Menu } from "@headlessui/react";

const ReviewListItem = ({
  onDelete,
  onEdit,
  reviewLike,

  userInfo,

  id,
  user,
  content,
  created_at,
  user_profile_image,
  like_users,
  importance,
  difficulty,
}) => {
  // <<수정 및 삭제>>
  // 수정 상태 on/off 값 저장
  const [isEdit, setIsEdit] = useState(false);

  // 리뷰를 쓴 유저와 현재 로그인한 유저가 같은 유저인지 판단하는 값 저장
  const [sameUserNow, setSameUserNow] = useState(false);

  // 수정을 하기 위한 값 저장
  const [localContent, setLocalContent] = useState(content);

  // 수정창을 on/off
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // 수정을 눌러서 수정창이 떴지만 수정을 취소하고 싶을 때
  const afterQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정 버튼 클릭시 수정을 하고 수정창을 닫음
  const handleEdit = () => {
    onEdit(id, localContent);
    toggleIsEdit();
  };

  // 리뷰 삭제
  const handleDelete = () => {
    onDelete(id);
  };

  // << 로그인한 유저에 따라 수정/삭제할 수 있는 메뉴버튼 노출 >>
  // 현재 같은 유저인지 판단하여 댓글을 수정/삭제할 수 있는 드롭다운 메뉴 노출 유무 결정
  const isSameUser = () => {
    if (userInfo.nickname === user) {
      setSameUserNow(true);
    } else {
      setSameUserNow(false);
    }
  };

  // user값이 바뀔때마다 isSameUser 실행
  useEffect(() => {
    isSameUser();
  }, [user]);

  // << 좋아요 >>
  // 해당 값이 현재 유저와 같은지 판단하는 값
  const [isLiked, setIsLiked] = useState(false);
  // 현재 좋아요를 누른 사람 수
  const [likeCount, setLikeCount] = useState(like_users?.length);

  // 좋아요를 누를시 서버요청 + like_users 바로 업데이트
  const handleLike = () => {
    reviewLike(id);
  };

  useEffect(() => {
    // 하트의 형태변화는 isLiked로 따로 관리
    // 좋아요를 누른 유저에 현재 로그인한 유저가 포함되어 있다면
    if (like_users?.includes(userInfo.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    // like_users가 변할때마다 likeCount를 업데이트
    setLikeCount(like_users?.length);
  }, [like_users]);

  let navigate = useNavigate();

  const toUserProfile = () => {
    navigate(`/user/${user}`);
  };

  return (
    <div>
      <div className="rounded mb-3 ">
        <div className="">
          <div className="border border-[rgb(71,79,88)] rounded-lg">
            <div className="grid grid-cols-8 bg-[rgb(45,51,59)] rounded-t-lg">
              {/* 유저프로필 */}
              <div className="col-span-1">
                <img
                  onClick={toUserProfile}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOXESdHIQO3wJZ2Ct7hu56W7k2s_Li3SYXyqYvNJ0SOSxRAL7xKVswcUCAOJXTJWsMTI&usqp=CAU"
                  alt="img"
                  className="w-12 h-12 rounded-full mt-2.5 ml-3 border-2 border-[rgb(71,79,88)]"
                />
              </div>

              {/*  */}
              <div className="col-span-7 ">
                <div className="pt-3 px-2 flex justify-between rounded-t-lg   text-[rgb(161,173,185)]">
                  <div className="flex">
                    <div className="text-xs ">{user}</div>
                  </div>

                  <div className="relative">
                    {sameUserNow ? (
                      <Menu>
                        <Menu.Button>
                          <BsThreeDotsVertical className="text-xs" />
                        </Menu.Button>
                        <Menu.Items className="absolute w-14 rounded-md mt-2 flex flex-col focus:outline-none py-1 border z-50 border-[rgb(71,79,88)] bg-[rgb(48,54,61)] ">
                          <Menu.Item className="grid justify-center items-center h-full border m-1 rounded-md border-[rgb(71,79,88)] hover:bg-[rgb(60,60,60)] cursor-pointer">
                            <span className="text-xs " onClick={toggleIsEdit}>
                              수정
                            </span>
                          </Menu.Item>
                          <Menu.Item className="grid justify-center items-center h-full border m-1 rounded-md border-[rgb(71,79,88)] hover:bg-[rgb(60,60,60)] cursor-pointer">
                            <span className="text-xs" onClick={handleDelete}>
                              삭제
                            </span>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="flex justify-between bg-[rgb(45,51,59)]">
                  <div className="flex">
                    <div className="flex mx-2">
                      <div className="text-[5px] mr-2">중요도</div>
                      {Array.from({ length: importance }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from({ length: 5 - importance }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-white" />
                      ))}
                    </div>
                    <div className="flex">
                      <div className="text-[5px] mr-2">난이도</div>
                      {Array.from({ length: difficulty }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-yellow-300" />
                      ))}
                      {Array.from({ length: 5 - difficulty }, (v, idx) => (
                        <FaStar key={idx} className="text-sm text-white" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className=" mr-3 flex">
                      <FaHeart
                        className={
                          isLiked
                            ? "text-red-600 mt-0.5 cursor-pointer hover:text-white text-[0.7rem]"
                            : "text-white mt-0.5 cursor-pointer hover:text-red-600 text-[0.7rem]"
                        }
                        onClick={handleLike}
                      />
                      <div className="text-xs ml-1">{likeCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgb(45,51,59)]">
              <div className="text-[5px] px-2 pb-2"></div>
            </div>
            {isEdit ? (
              <>
                <textarea
                  className="w-full border-md text-sm p-2 bg-[rgb(32,37,42)] text-[rgb(161,173,185)]"
                  value={localContent}
                  onChange={(e) => setLocalContent(e.target.value)}
                ></textarea>
              </>
            ) : (
              <div className="text-xs p-3  bg-[rgb(32,37,42)] text-white break-words">
                {content}
              </div>
            )}

            {isEdit ? (
              <div className="flex justify-end ">
                <span
                  onClick={afterQuitEdit}
                  className="mx-2 px-3 py-1 my-2 rounded-md bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] cursor-pointer text-white text-xs drop-shadow-md"
                >
                  취소
                </span>
                <span
                  onClick={handleEdit}
                  className="px-3 py-1 mr-2 my-2 rounded-md bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] cursor-pointer text-white text-xs drop-shadow-md"
                >
                  완료
                </span>
              </div>
            ) : null}
            <div className=" flex justify-end bg-[rgb(32,37,42)] rounded-b-lg">
              <div className="text-[3px] px-2 pb-2  text-[rgb(161,173,185)]">
                {new Date(created_at)?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListItem;

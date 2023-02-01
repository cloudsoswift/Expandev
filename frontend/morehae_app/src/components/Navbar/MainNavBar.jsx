import { useState } from "react";
import { Menu } from "@headlessui/react";
import { BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NotificationList from "@/components/Navbar/NotificationList";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/utils/store/user-slice";

// 블로그 url 구조 나오면 블로그 글 작성 페이지로 to 설정 필요.

const MainNavBar = () => {
  // 유저 정보
  const user = useSelector(state=>state.user.user);
  // 로그인 여부 판단 - user 정보를 담은 객체가 빈 객체면 로그인하지 않은 상태
  const isLogin = user.constructor === Object && Object.keys(user).length !== 0 ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handler
  /* AlarmLoadHandler()
   *
   *
   *
   */
  const logoutHandler = () => {
    dispatch(userLogout(navigate));
  };

  const buttonStyle = "border-2 border-black rounded-full p-2 mx-2";

  return (
    <nav className="h-20 bg-white sticky top-0 z-10 border-b">
      <div className="grid grid-cols-12 auto-cols-auto h-full items-center">
        <div className="logo col-span-3 pl-8 justify-items-center">
          <Link className="text-4xl font-bold" id="logo" to="/">
            개발바닥🐾
          </Link>
        </div>
        <div className="roadmapBtn col-span-3 justify-self-end">
          <Link
            className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl"
            to="/roadmap"
          >
            로드맵
          </Link>
        </div>
        <div className="blogBtn col-span-3 justify-self-start">
          <Link
            className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl"
            to="/blog"
          >
            블로그
          </Link>
        </div>
        {!isLogin && (
          <div className="signInBtn col-span-3 justify-self-end pr-4">
            <Link
              className="transition border-2 border-blue-400 rounded-lg p-2 px-8 text-2xl hover:border-blue-600 text-blue-400"
              to="/login"
            >
              로그인
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="userProfile col-span-3 flex justify-self-center items-center">
            <Link className={buttonStyle + ' inline-block'} to='/blog/write'>
              <BsPencilSquare size="24" />
            </Link>
            <Menu>
              <Menu.Button className={buttonStyle}>
                <FaBell size="24" />
              </Menu.Button>
              <NotificationList />
            </Menu>
            <Menu>
              <Menu.Button className={buttonStyle}>
                <BsFillPersonFill size="24" />
              </Menu.Button>
              <Menu.Items className="absolute top-full bg-slate-100 shadow-md rounded-md mt-2 w-56 flex flex-col focus:outline-none py-2 border">
                <Menu.Item>
                  <div className="w-full h-28 border-y grid grid-cols-2">
                    <div className="flex justify-center self-center">
                      <BsFillPersonFill size="48" className={buttonStyle} />
                    </div>
                    <div className="grid-cols-1 text-center items-center h-full border grid">
                      <div className="text-xl"title={user.nickname}>{user.nickname}</div>
                      <div className="text-sm text-black/70 overflow-hidden whitespace-nowrap text-ellipsis" title={user.email}>{user.email}</div>
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    className="flex px-2 py-2 border-b hover:bg-slate-200"
                    to="/user"
                  >
                    <span className="text-xl">마이 페이지</span>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="flex px-2 py-2 border-b hover:bg-slate-200"
                    onClick={logoutHandler}
                  >
                    <span className="text-xl">Logout</span>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavBar;

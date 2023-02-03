// import { useState } from "react";
import { Menu } from "@headlessui/react";
import { BsPerson, BsPencilSquare } from "react-icons/bs";
import { VscBell } from "react-icons/vsc";
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
  console.log(user.nickname)

  const userLink = `/user/${user.nickname}`

  const buttonStyle = "border border-black rounded-full mr-2";

  return (
    <nav className="h-20 bg-white sticky top-0 z-10 border-b">
      <div className="grid grid-cols-12 auto-cols-auto h-full items-center">
        <div className="logo col-span-3 pl-8 justify-items-center">
          <Link className="text-4xl font-bold" id="logo" to="/">
            개발자국🐾
          </Link>
        </div>
        <div className="roadmapBtn col-span-3 justify-self-end">
          <Link
            className="text-gray-500 hover:text-blue-500 rounded-xl p-2 px-8"
            to="/roadmap"
          >
            로드맵
          </Link>
        </div>
        <div className="blogBtn col-span-3 justify-self-start">
          <Link
            className="text-gray-500 hover:text-blue-500 rounded-xl p-2 px-8"
            to="/blog"
          >
            블로그
          </Link>
        </div>
        {!isLogin && (
          <div className="signInBtn col-span-3 justify-self-end pr-4">
            <Link
              className="transition border-2 border-blue-400 rounded-lg text-2xl hover:border-blue-600 text-blue-400 text-sm p-4"
              to="/login"
            >
              로그인/회원가입
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="userProfile col-span-3 flex justify-self-center items-center">
            <Link to='/blog/write'>
              <button className="transition bg-blue-100 p-2 px-4 rounded-full mr-4 text-sm text-blue-600 hover:bg-blue-500 hover:text-white" >글 작성하기</button>
            </Link>
            <Menu>
              <Menu.Button>
                <VscBell className="mr-4" size="25" />
              </Menu.Button>
              <NotificationList />
            </Menu>
            <Menu>
              <Menu.Button>
                <BsPerson size="25" />
              </Menu.Button>
              <Menu.Items className="absolute top-full bg-slate-100 shadow-md rounded-md mt-2 w-56 flex flex-col focus:outline-none py-2 border">
                <Menu.Item>
                  <div className="w-full h-28 border-y grid grid-cols-2">
                    <div className="flex justify-center self-center">
                      <BsPerson size="15" className={buttonStyle} />
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
                    to={userLink}
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
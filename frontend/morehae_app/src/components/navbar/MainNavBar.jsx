import { useState } from "react";
import { Menu } from "@headlessui/react";
import { BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NotificationList from "@/components/Navbar/NotificationList";

// 블로그 url 구조 나오면 블로그 글 작성 페이지로 to 설정 필요.

const MainNavBar = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Handler
  /* AlarmLoadHandler()
   *
   *
   *
   */
  const logoutHandler = () => {};

  const buttonStyle = "border-2 border-black rounded-full p-2 mx-2";

  return (
    <nav className="h-20 bg-white sticky top-0">
      <div className="grid grid-cols-12 auto-cols-auto h-full items-center">
        <div className="logo col-span-3 pl-8 justify-items-center">
          <Link className="text-4xl font-bold" to="/">
            MoreHae
          </Link>
        </div>
        <div className="roadmapBtn col-span-3 justify-self-end">
          <Link
            className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl font-bold"
            to="/roadmap"
          >
            로드맵
          </Link>
        </div>
        <div className="blogBtn col-span-3 justify-self-start">
          <Link
            className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl font-bold"
            to="/blog"
          >
            블로그
          </Link>
        </div>
        {!isLogin && (
          <div className="signInBtn col-span-3 justify-self-end pr-4">
            <Link
              className="border-4 border-indigo-500/75 rounded-xl p-2 px-8 text-xl font-bold"
              to="/login"
            >
              Sign In
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
                    <div className="grid justify-center items-center h-full border">
                      <span>사용자 이름</span>
                      <span>사용자 아이디</span>
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

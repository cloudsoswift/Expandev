// import { useState } from "react";
import { Menu } from "@headlessui/react";
import { BsPerson, BsPencilSquare } from "react-icons/bs";
import { VscBell } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import NotificationList from "@/components/Navbar/NotificationList";
import { useDispatch, useSelector } from "react-redux";
import httpWithURL from "@/utils/http";
import { userActions } from "@/utils/store/user-slice";
import logoImg from "@/img/expandev-logo-green.png";

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
    httpWithURL(process.env.REACT_APP_USER_URL)
      .post(process.env.REACT_APP_USER_URL + "logout/")
      .then((response) => {
        switch (response.status) {
          case 200:
          default:
            // Axios Default Header에 설정된 Access Token 삭제
            // setAccessToken();
            dispatch(userActions.setUser({}));
            // 로그아웃 후 로드맵 페이지로 이동
            navigate("/roadmap");
        }
      })
      .catch((e) => {
        // Axios Default Header에 설정된 Access Token 삭제
        // setAccessToken();
        dispatch(userActions.setUser({}));
        // 로그아웃 후 로드맵 페이지로 이동
        navigate("/roadmap");
      });
  };

  const userLink = `/user/${user.nickname}`

  const buttonStyle = "border border-black rounded-full mr-2";

  return (
    <nav className="h-20 bg-dark sticky top-0 z-10">
      <div className="grid grid-cols-12 auto-cols-auto h-full items-center">
        <div className="logo col-span-3 pl-8 justify-items-center">
          <Link className="text-4xl font-bold" id="logo" to="/">
            <img className="w-52" src={logoImg} alt="" />
          </Link>
        </div>
        <div className="roadmapBtn col-span-3 justify-self-end">
          <Link
            className="text-gray-500 hover:text-green-500 rounded-xl p-2 px-8"
            to="/roadmap"
          >
            로드맵
          </Link>
        </div>
        <div className="blogBtn col-span-3 justify-self-start">
          <Link
            className="text-gray-500 hover:text-green-500 rounded-xl p-2 px-8"
            to="/blog"
          >
            블로그
          </Link>
        </div>
        {!isLogin && (
          <div className="signInBtn col-span-3 justify-self-end pr-4">
            <Link
              className="transition rounded-lg border-2 border-green-600 text-green-500 hover:border-green-400 hover:text-green-300 text-sm p-4"
              to="/login"
            >
              로그인/회원가입
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="userProfile col-span-3 flex justify-self-center items-center">
            <Link to='/blog/write'>
              <button className="transition bg-green-100 p-2 px-4 rounded-full mr-4 text-sm text-green-600 hover:bg-green-500 hover:text-white" >글 작성하기</button>
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
              <Menu.Items className="absolute top-full bg-[#171b21] shadow-md rounded mt-2 py-2 w-56 flex flex-col focus:outline-none border border-slate-700">
                {/* <Menu.Item>
                  <div className="w-full h-28 border-y grid grid-cols-2">
                    <div className="flex justify-center self-center">
                      <BsPerson size="15" className={buttonStyle} />
                    </div>
                    <div className="grid-cols-1 text-center items-center h-full border grid">
                      <div className="text-xl"title={user.nickname}>{user.nickname}</div>
                      <div className="text-sm text-black/70 overflow-hidden whitespace-nowrap text-ellipsis" title={user.email}>{user.email}</div>
                    </div>
                  </div>
                </Menu.Item> */}
                <Menu.Item>
                  <Link
                    className="flex p-4 hover:bg-slate-700"
                    to={userLink}
                  >
                    <span>마이 페이지</span>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="flex p-4 text-red-500 hover:bg-slate-700"
                    onClick={logoutHandler}
                  >
                    <span>로그아웃</span>
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
import { useState } from "react";

const MainNavBar = () => {
  const [isLogin, setIsLogin] = useState(true);

  const bellIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>
  const userIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
  const writeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
  const buttonStyle = "border-2 border-black rounded-full p-3 mx-2"


  return (
    <nav className="h-20 bg-blue-50 border-b-4 border-b-blue-900/20 sticky top-0">
      <div className="grid grid-cols-12 auto-cols-auto h-full items-center">
        <div className="logo col-span-3 pl-8 justify-items-center">
          <a className="text-4xl font-bold" href="#">MoreHae</a>
        </div>
        <div className="roadmapBtn col-span-3 justify-self-end">
          <button className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl font-bold">
            로드맵
          </button>
        </div>
        <div className="blogBtn col-span-3 justify-self-start">
          <button className="hover:text-indigo-500/75 rounded-xl p-2 px-8 text-2xl font-bold">
            블로그
          </button>
        </div>
        {!isLogin && (
          <div className="signInBtn col-span-3 justify-self-end pr-4">
            <button className="border-4 border-indigo-500/75 rounded-xl p-2 px-8 text-xl font-bold">
              Sign In
            </button>
          </div>
        )}
        {isLogin && <div className="userProfile col-span-3 justify-self-center">
            <button className={buttonStyle}>{writeIcon}</button>
            <button className={buttonStyle}>{bellIcon}</button>
            <button className={buttonStyle}>{userIcon}</button>
          </div>}
      </div>
    </nav>
  );
};

export default MainNavBar;

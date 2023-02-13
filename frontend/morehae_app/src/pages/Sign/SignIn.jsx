// 입력에 대한 validation 과정 아직 구현 안됨

import { useState } from "react";
import { userActions } from "../../utils/store/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import httpWithURL from "@/utils/http";

const SignIn = () => {
  const [popup, setPopup] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWarnMsg] = useState("");
  const [passwordWarnMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 이메일 입력 처리하는 핸들러
  const handleEmail = (e) => {
    const newState = e.target?.value ?? "";
    setEmail((oldState) => {
      return newState;
    });
  };

  // 패스워드 입력 처리하는 핸들러
  const handlePassword = (e) => {
    const newState = e.target?.value ?? "";
    setPassword((oldState) => {
      return newState;
    });
  };

  // 로그인 form 이벤트 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(userActions.setAccessToken(""));
    httpWithURL(process.env.REACT_APP_USER_URL)
      .post(
        "login/",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then(({ status, data }) => {
        console.log(data);
        switch (status) {
          case 200:
            return data;
          default:
            break;
        }
      })
      .then((data) => {
        // refresh token을 86,400초 (60초 * 60분 * 24시간 = 1일) 유지되는 httpOnly Cookie로 설정.
        // document.cookie = `refresh_token=${data.refresh_token};path=/;max-age=86400;httpOnly;`;
        // const cookies = new Cookies();
        // cookies.set("refresh_token", data.refresh_token, {
        //   path: "/",
        //   httpOnly: true,
        //   maxAge: 86400,
        // });
        // console.log(cookies);
        dispatch(userActions.setAccessToken(data.access_token));
        dispatch(
          userActions.setUser({
            ...data.user,
          })
        );
        // 로그인 후 로드맵 페이지로 이동
        navigate(-1, { replace: true });
      })
      .catch((e) => {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const textStyle = "text-sm text-gray-500";
  const textWarningStyle = "text-xs text-red-500";
  const inputStyle =
    "transition bg-dark duration-300 box-border rounded-lg border-2 border-slate-700 w-full h-12 p-2 outline-none hover:border-green-500 focus:border-green-300";

  const handleKakaoClick = (e) => {
    e.preventDefault();
    const url = "http://i8d212.p.ssafy.io:8000/accounts/login/kakao/"
    const width = 430;
    const height = 500;
    const leftPos = Math.ceil(( window.screen.width - width )/2);
    const topPos = Math.ceil(( window.screen.height - height )/2);
    const popupWindow = window.open(url, '카카오 로그인', `width=${width}, height=${height}, left=${leftPos}, top=${topPos}, scrollbars=no`);
    const timer = setInterval(() => {
      if (!popupWindow?.closed) {
        console.log("팝업창 열려있음...");
      } else {
        console.log("팝업창 닫힘");
        clearInterval(timer);
        setPopup(null);
      }
    }, 1000)
    setPopup(popupWindow);
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="flex-column bg-[#171b21] w-[36rem] p-4 rounded-lg border border-slate-700">
        <h1 className="text-2xl flex justify-center mb-8">로그인</h1>
        <form>
          {/* 아이디 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>아이디</div>
              <div className={textWarningStyle}>{emailWarnMsg}</div>
            </div>
            <input
              value={email}
              onChange={handleEmail}
              placeholder="이메일주소@expandev.com"
              type="text"
              className={inputStyle + " mb-4"}
            />
          </div>

          {/* 비밀번호 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>비밀번호</div>
              <div className={textWarningStyle}>{passwordWarnMsg}</div>
            </div>
            <input
              value={password}
              onChange={handlePassword}
              type="password"
              className={inputStyle + " mb-4"}
            />
          </div>
          <Link
            className="transition w-full block text-end text-slate-400 hover:text-green-300 text-sm mb-1"
            to={"/signup"}
          >
            아직 회원이 아니신가요?
          </Link>
          <button
            onClick={handleLogin}
            className="transition w-full h-12 rounded-lg text-white bg-green-500 hover:bg-green-400 mb-8"
          >
            로그인
          </button>
          <button className="transition w-full h-12 rounded-lg bg-blue-700 text-white hover:bg-blue-500 mb-2">
            구글로 시작
          </button>
          <button onClick={handleKakaoClick} className="transition w-full h-12 rounded-lg bg-yellow-500 text-white hover:bg-yellow-300 mb-2">
            카카오로 시작
          </button>
          <button className="transition bg-green w-full h-12 rounded-lg bg-green-600 text-white hover:bg-green-500 mb-2">
            네이버로 시작
          </button>
          <button className="transition w-full h-12 rounded-lg bg-black text-white hover:bg-gray-700">
            애플로 시작
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

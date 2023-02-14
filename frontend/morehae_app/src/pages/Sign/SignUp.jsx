// validation 판단 핸들러는 useEffect를 사용하여 코드 개선이 가능하다
// 마찬가지로 패스워드 일치여부 판단 핸들러 또한 useEffect를 사용하여 코드 개선이 가능하다

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Dropdown from "@/components/Dropdown/Dropdown";
import httpWithURL from "@/utils/http";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../utils/store/user-slice";

const dummyItems = [
  { id: 0, content: "None" },
  { id: 1, content: "Frontend" },
  { id: 2, content: "Backend" },
  { id: 3, content: "Dev-ops" },
  { id: 4, content: "Embedded" },
];

const SignUp = () => {
  const emailRef = useRef("");
  const [emailWarnMsg, setEmailWarnMsg] = useState("");
  const [emailFixed, setEmailFixed] = useState("");
  const passwordRef = useRef("");
  const [passwordWarnMsg, setPasswordWarnMsg] = useState("");
  const passwordMatchRef = useRef("");
  const [matchWarnMsg, setMatchWarnMsg] = useState("");
  const nicknameRef = useRef("");
  const [nicknameWarnMsg, setNicknameWarnMsg] = useState("");
  const [nicknameFixed, setNicknameFixed] = useState("");
  const [position, setPosition] = useState({ id: 0, content: "포지션 선택" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.user.user);

  const textStyle = "text-sm text-gray-500";
  const textWarningStyle = "text-xs text-red-500";
  const inputStyle =
    "transition bg-dark duration-300 box-border rounded-lg border-2 border-slate-700 w-full h-12 p-2 outline-none hover:border-green-500 focus:border-green-300";
  const buttonStyle =
    "transition w-36 h-12 rounded-lg ml-2 bg-green-500 text-white hover:bg-green-400";

  useEffect(()=>{
    if(userInfo && !(userInfo.constructor === Object
      && Object.keys(userInfo).length === 0)){
        alert("로그인한 상태에서는 회원가입을 할 수 없습니다.");
        navigate('/');
      }
  })
  // 이메일 입력 처리하는 핸들러
  const handleEmail = (e) => {};

  // 이메일 주소 중복여부 판단하여 에러메시지 세팅하는 핸들러
  const checkEmailDulication = (e) => {
    e.preventDefault();
    if (emailFixed) {
      setEmailFixed("");
      emailRef.current.value = "";
      return;
    }
    const emailCheckPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailCheckPattern.test(emailRef.current.value.trim())) {
      setEmailWarnMsg("올바르지 않은 이메일 형식입니다.");
      return;
    }
    httpWithURL(process.env.REACT_APP_USER_URL)
      .get(`check-email/${encodeURIComponent(emailRef.current.value.trim())}`)
      .then((response) => {
        if (response.status === 200) {
          setEmailFixed(emailRef.current.value.trim());
          setEmailWarnMsg("");
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setEmailWarnMsg("중복된 이메일 주소입니다");
        }
      });
  };

  // 패스워드 입력 처리하는 핸들러
  const handlePassword = (e) => {
    const newState = e.target?.value ?? passwordRef.current;
    passwordRef.current = newState;
  };

  // 패스워드 validation 판단하여 에러메시지 세팅하는 핸들러
  const checkPasswordValidation = () => {
    let msg = passwordWarnMsg;
    const pwd = passwordRef.current;

    // 비밀번호는 8자 이상, 영문 대, 소문자 및 특수기호를 조합하여야 합니다.
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (passwordPattern.test(pwd)) {
      msg = "";
    } else {
      msg =
        "비밀번호는 8자 이상, 영문 대, 소문자 및 특수기호를 조합하여야 합니다.";
    }

    // 에러메시지 세팅할 떄, 일치여부에 대한 에러메시지까지 세팅해야 한다
    setPasswordWarnMsg(msg);
  };

  // 일치확인용 패스워드 입력 처리하는 핸들러
  const handlePasswordMatch = (e) => {
    passwordMatchRef.current = e.target?.value ?? "";
  };

  // 패스워드 일치여부 판단하여 에러메시지 세팅하는 핸들러
  const checkPasswordMatch = () => {
    setMatchWarnMsg(
      passwordMatchRef.current !== passwordRef.current
        ? "패스워드가 일치하지 않습니다"
        : ""
    );
  };

  // 닉네임 입력 처리하는 핸들러
  const handleNickname = (e) => {
  };

  // 닉네임 중복여부 판단하여 에러메시지 세팅하는 핸들러
  const checkNicknameDuplication = (e) => {
    e.preventDefault();
    if (nicknameFixed) {
      setNicknameFixed("");
      nicknameRef.current.value = "";
      return;
    }
    httpWithURL(process.env.REACT_APP_USER_URL)
      .get(`check-nickname/${encodeURIComponent(nicknameRef.current.value.trim())}`)
      .then((response) => {
        if (response.status === 200) {
          setNicknameFixed(nicknameRef.current.value.trim());
          setNicknameWarnMsg("");
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setNicknameWarnMsg("중복된 닉네임입니다");
        }
      });
  };

  // 제출 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    /*
      모든 validation을 점검해야한다...
    */
    console.log("제출!!");
    console.log(
      emailFixed,
      passwordRef.current,
      passwordMatchRef.current,
      nicknameFixed,
      position.content
    );
    httpWithURL(process.env.REACT_APP_USER_URL)
      .post("registration", {
        email: emailFixed,
        password1: passwordRef.current,
        password2: passwordMatchRef.current,
        nickname: nicknameFixed,
        position: position.content,
        login_type: "o",
        sns_service_id: "o",
      }) // }, {withCredentials: true})
      .then((response)=>{
        if(response.status === 201){
          alert("회원가입에 성공했습니다!")
          dispatch(userActions.setAccessToken(response.data.access_token));
          dispatch(
            userActions.setUser({
              ...response.data.user,
            })
          );
        }
      })
      .catch((error)=>{
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="flex-column bg-[#171b21] w-[36rem] p-4 rounded-lg border border-slate-700">
        <h1 className="text-2xl flex justify-center mb-8">회원 가입</h1>
        <form>
          {/* 아이디 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>아이디*</div>
              <div className={textWarningStyle}>{emailWarnMsg}</div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                onChange={handleEmail}
                className={inputStyle + " read-only:text-gray-600"}
                ref={emailRef}
                readOnly={emailFixed ? true : false}
              />
              <button onClick={checkEmailDulication} className={buttonStyle}>
                {!emailFixed ? "중복 확인" : "취소"}
              </button>
            </div>
          </div>

          {/* 비밀번호 입력 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>
              비밀번호(숫자 및 특수문자 합하여 8자이상)
            </div>
            <div className={textWarningStyle}>{passwordWarnMsg}</div>
          </div>
          <input
            type="password"
            onChange={handlePassword}
            onBlur={checkPasswordValidation}
            className={inputStyle + " mb-4"}
          />

          {/* 비밀번호 입력 확인 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>비밀번호 확인</div>
            <div className={textWarningStyle}>{matchWarnMsg}</div>
          </div>
          <input
            type="password"
            onChange={handlePasswordMatch}
            onBlur={checkPasswordMatch}
            className={inputStyle + " mb-4"}
          />

          {/* 닉네임 입력 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>닉네임*</div>
            <div className={textWarningStyle}>{nicknameWarnMsg}</div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              onChange={handleNickname}
              className={inputStyle + " read-only:text-gray-600"}
              ref={nicknameRef}
              readOnly={nicknameFixed ? true : false}
            />
            <button onClick={checkNicknameDuplication} className={buttonStyle}>
              {!nicknameFixed ? "중복 확인" : "취소"}
            </button>
          </div>

          {/* 포지션 입력 드롭다운 */}
          <p className={textStyle}>포지션 선택</p>
          <div className="w-72 mb-12">
            <Dropdown
              items={dummyItems}
              selectedItem={position}
              setSelectedItem={setPosition}
            />
          </div>

          {/* 제출 버튼 */}
          <button
            onClick={handleSubmit}
            className="transition w-full h-12 rounded-lg bg-green-500 text-white hover:bg-green-400"
          >
            등록하기!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

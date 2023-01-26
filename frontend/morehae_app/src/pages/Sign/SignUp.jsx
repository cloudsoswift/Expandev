// validation 판단 핸들러는 useEffect를 사용하여 코드 개선이 가능하다
// 마찬가지로 패스워드 일치여부 판단 핸들러 또한 useEffect를 사용하여 코드 개선이 가능하다

import { useState, useRef } from "react";
import axios from 'axios'
import Dropdown from "@/components/Dropdown/Dropdown";

const dummyItems = [
  {id: 0, content: "None"},
  {id: 1, content: "Frontend"},
  {id: 2, content: "Backend"},
  {id: 3, content: "Dev-ops"},
  {id: 4, content: "Embedded"},
]

const SignUp = () => {
  const emailRef = useRef("");
  const [emailWarnMsg, setEmailWarnMsg] = useState("");
  const passwordRef = useRef("");
  const [passwordWarnMsg, setPasswordWarnMsg] = useState("");
  const passwordMatchRef = useRef("");
  const [matchWarnMsg, setMatchWarnMsg] = useState("");
  const nicknameRef = useRef("");
  const [nicknameWarnMsg, setNicknameWarnMsg] = useState("");
  const [position, setPosition] = useState({id: 0, content: "포지션 선택"});

  const textStyle = "text-sm text-gray-500";
  const textWarningStyle = "text-xs text-red-500";
  const inputStyle = "transition duration-300 box-border rounded-lg border w-full h-12 p-2 outline-none hover:border-blue-300 focus:border-blue-500";
  const buttonStyle = "transition bg-white w-36 h-12 rounded-lg ml-2 bg-blue-500 text-white hover:bg-blue-300";

  // 이메일 입력 처리하는 핸들러
  const handleEmail = (e) => {
    const newState = e.target?.value ?? "";
    emailRef.current = newState;
  }

  // 이메일 주소 중복여부 판단하여 에러메시지 세팅하는 핸들러
  const checkEmailDulication = (e) => {
    e.preventDefault();
    console.log(emailRef.current);
    setEmailWarnMsg((oldState) => {
      if (true) {  // axios 통신 결과에따라 결정
        return "중복된 이메일 주소입니다";
      } else {
        return oldState;
      }
    })
  }

  // 패스워드 입력 처리하는 핸들러
  const handlePassword = (e) => {
    const newState = e.target?.value ?? passwordRef.current;
    passwordRef.current = newState;
  }

  // 패스워드 validation 판단하여 에러메시지 세팅하는 핸들러
  const checkPasswordValidation = () => {
    let msg = passwordWarnMsg;
    const pwd = passwordRef.current;

    if (pwd.length < 8) {
      msg = "8자 이상 입력해주세요";
    } else {
      /*
        1. 공백 포함 여부 확인해야함
        2. 특수문자 포함 여부 확인해야함
        const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      */
      msg = "";
    }

    // 에러메시지 세팅할 떄, 일치여부에 대한 에러메시지까지 세팅해야 한다
    setPasswordWarnMsg(() => {
      return msg;
    })
  }

  // 일치확인용 패스워드 입력 처리하는 핸들러
  const handlePasswordMatch = (e) => {
    passwordMatchRef.current = e.target?.value ?? "";
  }

  // 패스워드 일치여부 판단하여 에러메시지 세팅하는 핸들러
  const checkPasswordMatch = () => {
    setMatchWarnMsg((oldState) => {
      if (passwordMatchRef.current !== passwordRef.current) {
        return "패스워드가 일치하지 않습니다";
      } else {
        return "";
      }
    })
  }

  // 닉네임 입력 처리하는 핸들러
  const handleNickname = (e) => {
    nicknameRef.current = e.target?.value ?? "";
  }

  // 닉네임 중복여부 판단하여 에러메시지 세팅하는 핸들러
  const checkNicknameDuplication = (e) => {
    e.preventDefault();
    setNicknameWarnMsg((oldState) => {
      if (true) {  // axios 통신 결과에따라 결정
        return "중복된 닉네임 입니다";
      } else {
        return oldState;
      }
    })
  }

  // 제출 이벤트 핸들러 
  const handleSubmit = (e) => {
    e.preventDefault();
    /*
      모든 validation을 점검해야한다...
    */
    console.log("제출!!");
    console.log(emailRef.current, passwordRef.current, passwordMatchRef.current, nicknameRef.current, position.content);
    axios.post('http://i8d212.p.ssafy.io:8080/accounts/registration', {
      email: emailRef.current,
      password1: passwordRef.current,
      password2: passwordMatchRef.current,
      nickname: nicknameRef.current,
      position: position.content
    })  // }, {withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="flex-column w-[36rem] p-4 rounded-lg border">
        <h1 className="text-2xl flex justify-center mb-8">회원 가입</h1>
        <form>
          {/* 아이디 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>아이디*</div>
              <div className={textWarningStyle}>{emailWarnMsg}</div>
            </div>
            <div className="flex items-center mb-4">
              <input type="text" onChange={handleEmail} className={inputStyle} />
              <button onClick={checkEmailDulication} className={buttonStyle}>중복 확인</button>
            </div>
          </div>

          {/* 비밀번호 입력 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>비밀번호(숫자 및 특수문자 합하여 8자이상)</div>
            <div className={textWarningStyle}>{passwordWarnMsg}</div>
          </div>
          <input type="password" onChange={handlePassword} onBlur={checkPasswordValidation} className={inputStyle + " mb-4"} />

          {/* 비밀번호 입력 확인 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>비밀번호 확인</div>
            <div className={textWarningStyle}>{matchWarnMsg}</div>
          </div>
          <input type="password" onChange={handlePasswordMatch} onBlur={checkPasswordMatch} className={inputStyle + " mb-4"} />

          {/* 닉네임 입력 박스 */}
          <div className="flex justify-between">
            <div className={textStyle}>닉네임*</div>
            <div className={textWarningStyle}>{nicknameWarnMsg}</div>
          </div>
          <div className="flex items-center mb-4">
            <input type="text" onChange={handleNickname} className={inputStyle} />
            <button onClick={checkNicknameDuplication} className={buttonStyle}>중복 확인</button>
          </div>

          {/* 포지션 입력 드롭다운 */}
          <p className={textStyle}>포지션 선택</p>
          <div className="w-72 mb-12">
            <Dropdown items={dummyItems} selectedItem={position} setSelectedItem={setPosition} />
          </div>

          {/* 제출 버튼 */}
          <button onClick={handleSubmit} className="transition bg-white w-full h-12 rounded-lg bg-blue-500 text-white hover:bg-blue-300">등록하기!</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
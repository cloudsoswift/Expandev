// 입력에 대한 validation 과정 아직 구현 안됨

import { useState } from "react"
import { userLogin } from "../../utils/store/user-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
      return newState
    })
  }

  // 패스워드 입력 처리하는 핸들러
  const handlePassword = (e) => {
    const newState = e.target?.value ?? "";
    setPassword((oldState) => {
      return newState
    })
  }

  // 제출 이벤트 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(userLogin({email, password}, navigate));
  }

  const textStyle = "text-sm text-gray-500";
  const textWarningStyle = "text-xs text-red-500";
  const inputStyle = "transition duration-300 box-border rounded-lg border w-full h-12 p-2 outline-none hover:border-blue-300 focus:border-blue-500";

  return (
    <div className="flex justify-center mt-20">
      <div className="flex-column w-[36rem] p-4 rounded-lg border">
        <h1 className="text-2xl flex justify-center mb-8">로그인</h1>
        <form>
          {/* 아이디 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>아이디</div>
              <div className={textWarningStyle}>{emailWarnMsg}</div>
            </div>
            <input value={email} onChange={handleEmail} placeholder="이메일주소@morehae.com" type="text" className={inputStyle + " mb-4"} />
          </div>

          {/* 비밀번호 입력 박스 */}
          <div>
            <div className="flex justify-between">
              <div className={textStyle}>비밀번호</div>
              <div className={textWarningStyle}>{passwordWarnMsg}</div>
            </div>
            <input value={password} onChange={handlePassword} type="password" className={inputStyle + " mb-4"} />
          </div>

          <button onClick={handleLogin} className="transition bg-white w-full h-12 rounded-lg bg-blue-500 text-white hover:bg-blue-400 mb-8">로그인</button>
          <button className="transition bg-green w-full h-12 rounded-lg bg-green-600 text-white hover:bg-green-500 mb-2">네이버로 시작</button>
          <button className="transition bg-white w-full h-12 rounded-lg bg-yellow-500 text-white hover:bg-yellow-300 mb-2">카카오로 시작</button>
          <button className="transition bg-white w-full h-12 rounded-lg bg-blue-700 text-white hover:bg-blue-500 mb-2">구글로 시작</button>
          <button className="transition bg-white w-full h-12 rounded-lg bg-black text-white hover:bg-gray-700">애플로 시작</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
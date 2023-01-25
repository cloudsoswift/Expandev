import { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleInputPosition(e) {
    setPosition(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password, name, position);
  };

  return (
    <form className="flex flex-col items-center w-full">
      <h1 className="text-4xl">로그인</h1>
      <div className="mb-8 w-full">
        <label className="w-full">이메일</label>
        <input name="eeemail" type="text" placeholder="이메일을 입력해주세요" value={email} onChange={handleInputEmail} className="p-4 w-full rounded-lg border-2 focus:border-rose-600"/>
      </div>
      <div className="mb-8 w-full">
        <label className="w-full">비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={handleInputPassword} className="p-4 w-full rounded-lg border-2 focus:border-rose-600"/>
      </div>
      <div className="mb-8 w-full">
        <label className="w-full">이름</label>
        <input type="text" placeholder="이름을 입력해주세요" value={name} onChange={handleInputName} className="p-4 w-full rounded-lg border-2 focus:border-rose-600"/>
      </div>
      
      <button type="submit" onClick={handleSubmit} className="bg-gray-100 border-2 p-4 w-full rounded-lg hover:bg-blue-300">로그인</button>
    </form>
  )
}

export default SignIn
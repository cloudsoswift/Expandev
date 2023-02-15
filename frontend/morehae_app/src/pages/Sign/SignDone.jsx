import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../utils/store/user-slice";

const SignDone = (codeString) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false)
  const dispatch = useDispatch();
  
  const getAccesToken = (codeString) => {
    // 토큰 주세요
    console.log("토큰 주세요!!");
    fetch(`http://i8d212.p.ssafy.io:8000/accounts/login/kakao/token/${codeString}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        dispatch(userActions.setAccessToken(data.access_token));
        dispatch(userActions.setRefreshToken(data.refresh_token));
        dispatch(userActions.setUser(data.user));
        setIsAllowed(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("에러:", err);
        setIsLoading(false);
      })
  }
  useEffect(() => {
    let codeString = new URL(window.location.href).searchParams.get('code')
    console.log("codeString값:", codeString);
    if (codeString) {
      getAccesToken(codeString);
    }
    // window.opener.postMessage(codeString, "http://localhost:5173");
  }, []);

  const clickClose = (e) => {
    window.close();
  }

  return (
    <div>
      {isLoading ? <div>로딩중...</div> : (isAllowed ? <button onClick={clickClose}>로그인 완료(창 닫기)</button> : <button onClick={clickClose}>로그인 실패!</button>)}
    </div>
  )
}

export default SignDone;
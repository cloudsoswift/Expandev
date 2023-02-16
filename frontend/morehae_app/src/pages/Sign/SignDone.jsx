import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { userActions } from "../../utils/store/user-slice";

const SignDone = (codeString) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false)
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  
  const getAccesToken = (codeString, platform) => {
    // 토큰 주세요
    console.log("토큰 주세요!!");
    fetch(`${process.env.REACT_APP_USER_URL}login/${platform}/validate/${codeString}`, {
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
    const codeString = searchParams.get("code");
    const state = searchParams.get("state");
    console.log("codeString값:", codeString);
    getAccesToken(codeString, state ? "naver" : "kakao");
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
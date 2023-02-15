import httpWithURL from "@/utils/http";

import React, { useEffect, useRef } from "react";

const AddReply = ({onHandleCancel, id, replyType, getReplyData}, ref) => {
  const replyBoxRef = useRef(null);
  const handleFocus = () => {
    replyBoxRef.current.classList.replace('border-slate-700', 'border-green-500');
  }
  const InputRef = useRef(null);

  const handleBlur = () => {
    replyBoxRef.current.classList.replace('border-green-500', 'border-slate-700');
  }

  const handleCancel = () => {
    onHandleCancel();
    InputRef.current.value = "";
    InputRef.current.blur();
  }
  
  const handleAdd = () => {
    const content = InputRef?.current.value
    console.log("등록할 댓글 텍스트:", content);
    switch (replyType) {
      case 'main':
        const articleID = id;
        console.log("main 댓글 달기:", articleID);
        httpWithURL(process.env.REACT_APP_ARTICLE_URL)
          .post(`${articleID}/comment`, {
            content: content
          })
          .then(response => {
            console.log("등록된 댓글:", response.data);
            getReplyData();
          })
          .catch((e) => {
            alert("서버와 통신중 에러가 발생했습니다. 다시 시도해주세요.");
          });
        break;
      case 'sub':
        const parentID = id;
        console.log("sub 댓글 달기:", parentID);
        httpWithURL("http://i8d212.p.ssafy.io:8000/blogs/recomment/")
          .post(`${parentID}`, {
            content: content
          })
          .then(response => {
            console.log("등록된 대댓글:", response.data);
            getReplyData();
          })
          .catch((e)=>{
            alert("서버와 통신중 에러가 발생했습니다. 다시 시도해주세요.");
          });
        break;
      default:
        console.log("알 수 없는 타입");
    }
    InputRef.current.value = "";
    InputRef.current.blur();
  }

  useEffect(() => {
    InputRef.current.focus();
  }, [])

  // useEffect(() => {
  //   console.log("articleID:", articleID);
  // }, [articleID])
  return (
    <div>
      <div ref={replyBoxRef} className="transition-colors duration-300 border-b-4 border-slate-700 my-2 pb-1 flex mr-2">
        <input ref={InputRef} onFocus={handleFocus} onBlur={handleBlur} className="border border-blue-300 bg-transparent w-full border-none"/>
        <button onClick={handleCancel} className="transition-colors w-10 text-gray-500 hover:text-red-500">취소</button>
        <button onClick={handleAdd}className="transition-colors w-10 hover:text-green-300">등록</button>
      </div>
    </div>
  )
}

export default AddReply;
import React, { useRef } from "react";

const AddReply = ({setIsShowInputReply}, ref) => {
  const replyBoxRef = useRef(null);
  const handleFocus = () => {
    replyBoxRef.current.classList.replace('border-slate-700', 'border-green-500');
  }

  const handleBlur = () => {
    replyBoxRef.current.classList.replace('border-green-500', 'border-slate-700');
  }
  return (
    <div>
      <div ref={replyBoxRef} className="transition-colors duration-300 border-b-4 border-slate-700 my-2 pb-1 flex mr-2">
        <input ref={ref} onFocus={handleFocus} onBlur={handleBlur} className="border border-blue-300 bg-transparent w-full border-none"/>
        <button onClick={() => setIsShowInputReply(false)} className="transition-colors w-10 text-gray-500 hover:text-red-500">취소</button>
        <button onClick={() => console.log("댓글 등록 버튼 누름")}className="transition-colors w-10 hover:text-green-300">등록</button>
      </div>
    </div>
  )
}
const forwardedRefInput = React.forwardRef(AddReply);
export default forwardedRefInput;

// export default AddReply;
import { useEffect } from "react";
import { useState } from "react";

const InputTitle = ({onChange, value, setValid}) => {
  // 제목 관련 State
  const [titleTouched, setTitleTouched] = useState("");
  // - 제목 Validation을 위한 값
  const titleIsEmpty = value.trim() === "";
  const titleMaxLengthValid = value.trim().length < 100;
  const titleIsValid = !titleIsEmpty && titleMaxLengthValid;
  // 제목 관련 Handler 및 Valicdation 값
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  const handleInputBlur = (e) => {
    setTitleTouched(true);
  };

  useEffect(()=>{
    setValid(titleIsValid);
  }, [value]);

  return (
    <div>
      <div>
        <span className="text-2xl">제목</span>
        {!titleIsValid && titleTouched && (
        <span className="text-xs text-red-500 ml-2">{titleIsEmpty ? "제목은 필수입니다." : "제목은 100자 이하여야 합니다."}</span>
        )}
      </div>
      <input
        className="px-3 py-2 text-white bg-slate-800 rounded-md shadow-sm placeholder-slate-40 w-full"
        type="text"
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      
    </div>
  );
};
export default InputTitle;
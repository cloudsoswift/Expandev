import { useEffect } from "react";
import { useState } from "react";

const InputOverview = ({value, onChange}) => {
  // 요약글 관련 State
    // 요약글(overview) 관련 Handler
    const handleOverviewChange = (e) => {
      // setOverview(e.target.value);
      onChange(e.target.value);
    };
    const overviewIsEmpty = value.trim() === "";
    const overviewMaxLengthValid = value.trim().length < 150;
    // useEffect(()=>{
    //   if(value){
    //     setOverview(value);
    //   }
    // }, []);
  return (
    <div className="h-60 py-2">
      <span className="text-sm text-gray-500">
        (선택)글 요약
        <br />
      </span>
      <textarea
        className="px-3 py-2 border bg-white text-2xl rounded-md shadow-sm placeholder-slate-40 w-full h-full resize-none"
        placeholder="글 요약을 입력해주세요."
        value={value}
        onChange={handleOverviewChange}
      />
    </div>
  );
};

export default InputOverview;

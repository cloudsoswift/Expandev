import { useEffect } from "react";

const InputOverview = ({ onChange, value, setValid }) => {
  // 요약글 관련 State
  // 요약글(overview) 관련 Handler
  const handleOverviewChange = (e) => {
    // setOverview(e.target.value);
    onChange(e.target.value);
  };
  const overviewIsEmpty = value.trim() === "";
  const overviewMaxLengthValid = value.trim().length < 150;
  // overview는 입력되지 않거나(선택 사항이므로) 입력하되, 150자 이하여야 함.
  const overviewIsValid = !overviewIsEmpty && overviewMaxLengthValid;
  // 입력한 overview가 부모 state에 반영될 떄 마다 유효성 검사.
  useEffect(() => {
    setValid(overviewIsValid);
  }, [value]);
  return (
    <div className="h-60 py-2 ">
      <span className="text-sm text-gray-500">
        글 요약
      { !overviewMaxLengthValid && (
        <span className="text-xs text-red-500 ml-2 mb-1">
          요약글은 150자 이하여야 합니다.
        </span>
      )}
        <br />
      </span>
      <textarea
        className="px-3 py-2 bg-slate-800 rounded-md shadow-sm placeholder-slate-40 w-full h-full resize-none"
        placeholder="글 요약을 입력해주세요."
        value={value}
        onChange={handleOverviewChange}
      />
    </div>
  );
};

export default InputOverview;

import { useState } from "react";

function useInput(initValue, validate) {
  const [value, setValue] = useState(initValue);
  
  const onChangeHandler = (e) => {
    // validation 진행
    validate(e.target.value);
  }

  return [value, onChangeHandler];
}

export default useInput;
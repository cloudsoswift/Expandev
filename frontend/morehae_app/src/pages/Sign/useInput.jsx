const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const onChangeHandler = (e) => {
    setValue((oldState) => {
      const newState = e.target.value();
      return newState;
    })
  }

  const isValidInput = ()=> {
    // 최소 입력해야 하는 글자수
    // 형식 확인할 것
  }

  // onBlur
  // onFocus

  return [value, onChangeHandler];
}

export default useInput
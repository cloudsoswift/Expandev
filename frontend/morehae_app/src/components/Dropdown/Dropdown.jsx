const options = [
  {id: 1, title: "프론트엔드"},
  {id: 2, title: "백엔드"},
  {id: 3, title: "모바일"}
]

const Dropdown = () => {
  function onChangeHandler(e) {
    console.dir(JSON.parse(e.target.value));
  }
  
  return (
    <select onChange={onChangeHandler}>
      {options.map((option) => (
        <option key={option.id} value={JSON.stringify(option)}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

export default Dropdown;
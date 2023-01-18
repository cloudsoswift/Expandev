import {BsChevronDown} from 'react-icons/bs'
import {useState} from 'react'

const roleListDummy = [
  {id: 1, content: "프론트엔드"},
  {id: 2, content: "백엔드"},
  {id: 3, content: "모바일"},
  {id: 4, content: "Dev-ops"},
  {id: 5, content: "풀스택"}
]

const Dropdown = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const obj = {
    name: "tico",
    age: 13
  }

  function clickHandler() {
    setIsShowing(!isShowing);
  }

  function selected(e) {
    console.log(roleListDummy[e.target?.value-1]);
    setIsShowing(!isShowing);
  }
  return (
    <div>
      <button onClick={clickHandler} className="cursor-default w-full h-12 bg-red-100 rounded-md flex items-center justify-between p-4">
        희망 직군을 선택해주세요
        <BsChevronDown />
      </button>
      {isShowing && 
      <ul className="bg-blue-300 max-h-60 overflow-y-auto">
        {roleListDummy.map((role)=>(
          <li key={role.id} value={role.id} onClick={selected} className="p-2 hover:bg-yellow-300">{role.content}</li>
        ))}
      </ul>
      }
    </div>
  )
}

export default Dropdown;
import {BsChevronDown} from 'react-icons/bs'
import { useEffect } from 'react'

const Dropdown = ({isOpenRole, setIsOpenRole, selectedRole, setSelectedRole, roleList}) => {
  const msg = "희망 직군을 선택해주세요";
  useEffect(() => {
    // console.log("드롭다운 렌더링됨", isOpenRole);
    console.log("렌더", roleList);
  })
  
  function clickHandler() {
    setIsOpenRole(!isOpenRole);
  }

  function selected(e) {
    // console.log(roleListDummy[e.target?.value]);
    setIsOpenRole(!isOpenRole);
    setSelectedRole(e.target?.value)
  }

  return (
    <div className="relative w-full">
      <button onClick={clickHandler} className="cursor-default h-12 bg-red-100 flex items-center w-full justify-between p-4">
        {msg}
        <BsChevronDown />
      </button>
      {isOpenRole && 
      <ul className="absolute w-full bg-blue-300 max-h-60 overflow-y-auto">
        {roleList.map((role, index)=>(
          <li key={role.id} value={index} onClick={selected} className="p-2 hover:bg-yellow-300">{role.content}</li>
        ))}
      </ul>
      }
    </div>
  )
}

export default Dropdown;
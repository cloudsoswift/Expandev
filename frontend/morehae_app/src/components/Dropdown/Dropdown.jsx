/* single select만 가능한 드롭다운 컴포넌트 */

import { useState, useEffect, useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'

// items: 리스팅 될 아이템들, selectedItem: 선택할 아이템 객체, setSelectedItem: 아이템 객체에 대한 setter
function Dropdown({items, selectedItem, setSelectedItem}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);

  // 드롭다운 클릭에 대한 핸들러
  const handleOpen = (e) => {
    e.preventDefault();
    // 드롭다운 창 닫기
    setIsOpen((oldState) => {
      return !oldState;
    })
  }

  // 아이템 클릭에 대한 핸들러
  const handleSelect = (index) => {
    if (index === undefined) {
      console.log("?????????????????");
    } else {
      setSelectedItem((oldState) => {
        return items[index];
      })
    }
    
    // 드롭다운 창 닫기
    setIsOpen((oldState) => {
      return !oldState;
    })
  }
    
  //   // 드롭다운 창 닫기
  //   setIsOpen((oldState) => {
  //     return !oldState;
  //   })
  // }

  useEffect(() => {
    // 마우스 클릭이 드롭다운 컴포넌트 외부에 찍혔는지를 판단하기 위한 핸들러
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(() => {
          return false;
        });
      }
    }

    // 핸들러 등록
    document.addEventListener("mousedown", handler);

    // 핸들러 등록 해제
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [])

  useEffect(() => {
    if (items?.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [items])

  return (
    <div className="flex-col relative w-full" ref={menuRef}>
      <button onClick={handleOpen} disabled={isDisable} className="transition bg-white w-full p-4 rounded-lg border border-slate-700 hover:border-green-500 flex justify-between font-extralight items-center bg-dark">
        <div>{selectedItem.content}</div>
        <div><BsChevronDown/></div>
      </button>
      { isOpen && 
      <ul className="overflow-y-auto max-h-48 bg-dark absolute w-full rounded-lg p-2 mt-2 border border-slate-700" style={{boxShadow: '1px 2px 9px rgba(0, 0, 0, 0.07)'}}>
        {items.map((item, index) => {
          let style = "transition p-4 rounded-lg cursor-pointer font-extralight";
          if (item.id === selectedItem.id) {
            style += " bg-green-500 text-white"
          } else {
            style += " hover:bg-slate-800"
          }
          return <li
            value={index}
            key={item.id}
            onClick={ () => handleSelect(index) }
            className={style}>
              <span>{item.content}</span>
            </li>
        })}
      </ul>
      }
    </div>
  )
}

export default Dropdown;
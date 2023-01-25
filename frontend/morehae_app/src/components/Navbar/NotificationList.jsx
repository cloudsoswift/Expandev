import { Menu } from "@headlessui/react";
import { useState } from "react";
import NotificationItem from "@/components/Navbar/NotificationItem";

const DUMMY_DATA = [
  {
    id: 1,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
  {
    id: 2,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
  {
    id: 3,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
  {
    id: 4,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
  {
    id: 5,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
  {
    id: 6,
    title: "제목" + Math.random(),
    content: "내용" + Math.random()
  }, 
]

const NotificationList = () => {
  const [notiList, setNotiList] = useState(DUMMY_DATA);
  const deleteNotificationHandler = (id) => {
    setNotiList(prevList => prevList.filter((data)=>data.id !== id))
  }
  return (
    <Menu.Items className="absolute top-full bg-white shadow-md rounded-md mt-2 w-56 max-h-56 flex flex-col focus:outline-none py-2 border overflow-x-hidden text-ellipsis">  
      {notiList.map((data)=><NotificationItem data={data} deleteNotification={deleteNotificationHandler}/>)}
    </Menu.Items>
  )
}

export default NotificationList;
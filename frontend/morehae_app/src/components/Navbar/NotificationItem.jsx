import { Menu } from "@headlessui/react";
// import { useReducer } from "react";
import { GrClose } from "react-icons/gr"
const NotificationItem = (props) => {

  const deleteHandler = () => {
    props.deleteNotification(props.data.id);
  }

  return (
    <Menu.Item>
      <div className="relative grid auto-rows-auto border-y border-collapse border-gray-400 py-2">
        <button className="w-min absolute top-1 right-1" onClick={deleteHandler}>
          <GrClose />
        </button>
        <div className="p-2 w-min space-y-3 inline-block overflow-hidden text-ellipsis whitespace-nowrap">
          <p className="text-xl">{props.data.title}</p>
          <p className="text-sm">{props.data.content}</p>
        </div>
      </div>
    </Menu.Item>
  )
}

export default NotificationItem;
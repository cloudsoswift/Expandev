import { Menu } from "@headlessui/react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
const NotificationItem = (props) => {
  const deleteHandler = () => {
    props.deleteNotification(props.data.id);
  };

  return (
    <Menu.Item>
      <div className="relative grid auto-rows-auto border-b first:border-y border-collapse border-gray-400 py-2">
        <button
          className="w-min absolute top-1 right-1"
          onClick={deleteHandler}
        >
          <GrClose />
        </button>
        <div className="p-2 space-y-3 overflow-hidden whitespace-nowrap" title={props.data.content}>
          <Link to="/">
            <p className="text-xl overflow-hidden text-ellipsis">{props.data.title}</p>
            <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{props.data.content}</p>
          </Link>
        </div>
      </div>
    </Menu.Item>
  );
};

export default NotificationItem;

import {RxCross1} from "react-icons/rx";

const TagPill = ({title, onDelete}) => {
  const handleDelete = () => {
    onDelete((prevTagList)=> {
      return prevTagList.filter((tag)=>tag !== title);
    });
  }
  return <span className="rounded-full p-2 py-2 mt-1 bg-blue-500 text-white inline-block">
    {title}
    <button className="ml-1" onClick={handleDelete}><RxCross1 /></button>
  </span>
}

export default TagPill;
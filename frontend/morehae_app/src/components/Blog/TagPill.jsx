import {RxCross1} from "react-icons/rx";

// onDelete 함수 할당 안 할 경우, 표시용 태그.
// onDelete 함수 할당시, 글 작성-수정할 때 쓰는 삭제 가능한 태그.
const TagPill = ({title, onDelete}) => {
  const handleDelete = () => {
    onDelete((prevTagList)=> {
      return prevTagList.filter((tag)=>tag !== title);
    });
  }
  return <span className="rounded-full p-2 py-2 mt-1 mx-1 bg-blue-500 text-white inline-block">
    {title}
    {onDelete && <button className="ml-1" onClick={handleDelete}><RxCross1 /></button>}
  </span>
}

export default TagPill;
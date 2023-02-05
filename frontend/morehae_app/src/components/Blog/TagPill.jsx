import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

// onDelete 함수 할당 안 할 경우, 표시용 태그.
// onDelete 함수 할당시, 글 작성-수정할 때 쓰는 삭제 가능한 태그.
const TagPill = ({ title, onDelete, count, id }) => {
  const handleDelete = () => {
    onDelete((prevTagList) => {
      return prevTagList.filter((tag) => tag.tag !== title);
    });
  };
  return (
    <div className="inline">
      {!onDelete && (
        <Link to={`/blog/tag/${id}`}>
          <span
            className="rounded-full p-2 py-2 mt-1 mx-1 bg-blue-500 text-white inline-block"
            title={`등록된 게시물 수 : ${count}`}
          >
            {title}
          </span>
        </Link>
      )}
      {onDelete && (
        <span
          className="rounded-full p-2 py-2 mt-1 mx-1 bg-blue-500 text-white inline-block"
          title={`등록된 게시물 수 : ${count}`}
        >
          {title}
          {onDelete && (
            <button className="ml-1" onClick={handleDelete}>
              <RxCross1 />
            </button>
          )}
        </span>
      )}
    </div>
  );
};

export default TagPill;

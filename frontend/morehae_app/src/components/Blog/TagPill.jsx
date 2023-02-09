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

  const pillStyle = "transition-color duration-300 rounded-full px-4 py-3 bg-purple-700 text-white text-sm inline-block hover:bg-purple-500"
  return (
    <div className="inline">
      {!onDelete && (
        <Link to={{pathname: `/blog/tag/${title.replaceAll("?","%3F")}`, search:`?count=1`}} >
          <span
            className={pillStyle}
            title={`등록된 게시물 수 : ${count}`}
          >
            {title}
          </span>
        </Link>
      )}
      {onDelete && (
        <span
          className={pillStyle}
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

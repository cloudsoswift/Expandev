// 게시글의 프리뷰인 카드UI 컴포넌트
import { useState, useEffect } from "react";

const PostPreview = ({post}) => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const date = new Date(post.created_at);
    setDateString((oldState) => {
      return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
    })
    console.log();
  })

  return (
    <div className="w-72 h-96 rounded-xl m-2 hover:bg-gray-300 cursor-pointer shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
      {/* 카드 썸네일 */}
      <div className="p-2">
        <div role="thumbnail" className="w-full bg-gray-100 h-48 rounded-2xl"></div>
      </div>
      
      {/* 카드 내용 */}
      <div className="pl-4 pr-4 pb-4">
        <p className="truncate text-2xl font-bold mb-2">{post.title}</p>
        <p className="flex justify-end text-xs mb-2 text-gray-400">{dateString}</p>
        <p className="h-16 line-clamp-4 text-xs">{post.content}</p>
        {/* <p>{post.tags.map(e => <div>{e.tag}</div>)}</p> */}
      </div>
    </div>
  )
}

export default PostPreview;
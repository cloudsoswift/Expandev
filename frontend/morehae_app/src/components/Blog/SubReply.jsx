import { useEffect, useRef, useState } from 'react'
import AddReply from './AddReply';

const SubReply = ({reply}) => {
  const [isShowInputReply, setIsShowInputReply] = useState(false);
  const replyInputRef = useRef(null);
  
  useEffect(() => {
    if (isShowInputReply) {
      replyInputRef.current.focus()
    }
  }, [isShowInputReply])

  const showInput = () => {
    setIsShowInputReply(!isShowInputReply);
  }

  return (
    <div className="mt-4 ml-8">
      <div className="flex items-center mb-2">
        <img className="w-12 h-12"></img>
        <div className="ml-3 text-sm">
          <p className="font-bold">{reply.username}</p>
          <p className="text-gray-400">{"2023년 02월 01일"}</p>
        </div>
      </div>
      <p className="my-2">
        {reply.content}
      </p>
      <div className="flex items-center">
        <button>🤍</button>
        <p className="mr-4">{reply.like_users_count}</p>
        <button onClick={showInput} className="transition-color duration-500 hover:bg-purple-500 active:bg-purple-700 p-2 rounded-xl">답글 달기</button>
      </div>
      <div className='ml-2'>
        {isShowInputReply &&
        <AddReply setIsShowInputReply={setIsShowInputReply} ref={replyInputRef}/>
        }
      </div>
    </div>
  )
}

export default SubReply;


/*
"id": 5,
"username": "어드민",
"like_users_count": 0,
"liked": false,
"profile_image": "/media/3.png",
"content": "adfasdfas dfasdf",
"created_at": "2023-02-03T12:48:39.518256+09:00",
"updated_at": "2023-02-03T12:48:39.518296+09:00",
"is_secret": false,
"article": 5,
"user": 2,
"parent_comment": 2,
"like_users": []
*/
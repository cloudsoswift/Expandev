import { useState } from 'react'

const Reply = ({reply}) => {
  const [isShowInputReply, setIsShowInputReply] = useState(false);

  return (
    <div className="mb-4 bg-red-100">
      <div className="flex items-center mb-2">
        <img className="w-12 h-12"></img>
        <div className="ml-3 text-sm">
          <p className="font-bold">{"티코님"}</p>
          <p className="text-gray-400">{"2023년 02월 01일"}</p>
        </div>
      </div>
      <p>
        {"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세"}
      </p>
      <div className="flex justify-between">
        <button>답글 보기(5)</button>
        <button onClick={() => setIsShowInputReply(!isShowInputReply)}>답글 달기</button>
      </div>
      {isShowInputReply && 
      <div>답글 입력창</div>
      }
    </div>
  )
}

export default Reply;

/*
{
    "id": 12,
    "like_users_count": 0,
    "liked": false,
    "content": "ㅋ",
    "created_at": "2023-01-19T07:39:44.848376Z",
    "updated_at": "2023-01-19T07:39:44.848415Z",
    "is_secret": false,
    "article": 2,
    "user": 3,
    "username": "유저이름", --> 추가될 것
    "user_thumbnail": "프사url 주소" --> 추가될 것
    "parent_comment": null,
    "like_users": []
},
*/
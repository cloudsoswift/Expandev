import { useEffect, useRef, useState } from 'react'
import SubReply from './SubReply';
import httpWithURL from "@/utils/http";
import AddReply from './AddReply';

const dummyReplies = [
  {
      "id": 12,
      "like_users_count": 0,
      "liked": false,
      "content": "대댓글1",
      "created_at": "2023-01-19T07:39:44.848376Z",
      "updated_at": "2023-01-19T07:39:44.848415Z",
      "is_secret": false,
      "article": 2,
      "user": 3,
      "parent_comment": null,
      "like_users": []
  },
  {
      "id": 2,
      "like_users_count": 1,
      "liked": true,
      "content": "대댓글2",
      "created_at": "2023-01-19T05:43:00.625257Z",
      "updated_at": "2023-01-19T05:43:00.625288Z",
      "is_secret": false,
      "article": 2,
      "user": 3,
      "parent_comment": null,
      "like_users": [
          3
      ]
  }
]

const MainReply = ({reply, getReplyData}) => {
  const [isShowSubReply, setIsShowSubReply] = useState(false);
  const [isShowInputReply, setIsShowInputReply] = useState(false);
  const [subReplies, setSubReplies] = useState([]);
  // const replyInputRef = useRef(null);

  // useEffect(() => {
  //   if (isShowInputReply) {
  //     replyInputRef.current.focus()
  //   }
  // }, [isShowInputReply])

  // 대댓글 리스트 요청
  const getSubReplyData = () => {
    // setSubReplies(() => dummyReplies)
    httpWithURL(process.env.REACT_APP_BLOG_URL) // GET 요청
      .get(`recomment?parent_id=${reply.id}`)
      .then((Response) => {
        console.log("대댓글 상세정보:", Response.data?.recomments);
        setSubReplies((oldState) => {
          // return dummyReplies;
          return Response.data?.recomments ?? oldState;
        })
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const showSubReply = () => {
    if (isShowSubReply === false) {
      getSubReplyData();
    }
    setIsShowSubReply(!isShowSubReply);
  }

  const showInput = () => {
    setIsShowInputReply(!isShowInputReply);
  }
  const deleteReply = () => {
    const isDelete = window.confirm("정말 삭제하시겠습니까??");
    if (isDelete) {
      console.log("삭제할 거임:", reply.id);
      httpWithURL("http://i8d212.p.ssafy.io:8000/blogs/comment/")
        .delete(`${reply.id}`)
        .then(response => {
          getReplyData();
        })
        .catch(err => console.log(err))
    }
  }

  useState(() => {
    getSubReplyData();
    // console.log(subReplies, reply.recomments_count);
  }, [])

  return (
    <div className="mt-8">
      <div className="flex items-center mb-2">
        <img src={`http://i8d212.p.ssafy.io:8000/` + reply.user_profile_image}className="w-12 h-12 rounded-full"></img>
        <div className="flex justify-between w-full">
          <div className="ml-3 text-sm">
            <p className="font-bold">{reply.username}</p>
            <p className="text-gray-400">{"2023년 02월 01일"}</p>
          </div>
          <button onClick={deleteReply} className="text-slate-600 hover:text-red-500">삭제</button>
        </div>
      </div>
      <p className="mt-2">
        {reply.content}
      </p>
      <div className="flex items-center">
        <button>{reply.liked ? "🧡" : "🤍"}</button>
        <p className="mr-4">{reply.like_users_count}</p>
        <button onClick={showInput} className="transition-color duration-500 hover:bg-purple-500 active:bg-purple-700 p-2 rounded-xl">답글 달기</button>
      </div>
      <div className='ml-2'>
        {isShowInputReply &&
        <AddReply onHandleCancel={() => setIsShowInputReply(false)} id={reply.id} getReplyData={getSubReplyData} replyType="sub"/>
        }
        {subReplies.length !== 0 &&
        <button onClick={showSubReply} className="transition-colors text-blue-500 hover:text-green-300">답글 보기({subReplies.length})</button>
        }
        {isShowSubReply && 
        subReplies.map(subReply => <SubReply key={subReply.id} reply={subReply} />)
        }
      </div>
    </div>
  )
}

export default MainReply;

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
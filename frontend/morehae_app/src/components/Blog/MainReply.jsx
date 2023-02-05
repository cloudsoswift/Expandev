import { useState } from 'react'
import SubReply from './SubReply';
import httpWithURL from "@/utils/http";
import AddReply from './AddReply';

const MainReply = ({reply}) => {
  const [isShowSubReply, setIsShowSubReply] = useState(false);
  const [isShowInputReply, setIsShowInputReply] = useState(false);
  const [subReplies, setSubReplies] = useState([]);

  const getSubReplyData = () => {
    httpWithURL(process.env.REACT_APP_TEST_BLOG_URL) // GET 요청
      .get(`recomment?parent_id=${2}`)
      .then((Response) => {
        console.log("대댓글 상세정보:", Response.data);
        setSubReplies((oldState) => {
          return Response?.data ?? oldState;
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

  return (
    <div className="mt-4 bg-blue-100">
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
      <div className="flex">
        <button>🤍</button>
        <p className="mr-4">{reply.like_users_count}</p>
        <button onClick={showInput}>답글 달기</button>
      </div>
      <button onClick={showSubReply}>답글 보기(5)</button>
      {isShowInputReply &&
      <AddReply />
      }
      {isShowSubReply && 
      subReplies.map(subReply => <SubReply key={subReply.id} reply={subReply} />)
      }
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
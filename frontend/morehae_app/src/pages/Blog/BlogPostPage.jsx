import { useEffect, useState } from "react";
import axios from 'axios'
import Reply from "../../components/Blog/Reply";

const dummyReplies = [
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
      "username": "티코",
      "user_thumbnail": "urlurl",
      "parent_comment": null,
      "like_users": []
  },
  {
      "id": 2,
      "like_users_count": 1,
      "liked": true,
      "content": "zzzzz",
      "created_at": "2023-01-19T05:43:00.625257Z",
      "updated_at": "2023-01-19T05:43:00.625288Z",
      "is_secret": false,
      "article": 2,
      "user": 3,
      "username": "강아지",
      "user_thumbnail": "urlurl",
      "parent_comment": null,
      "like_users": [
          3
      ]
  }
]

const BlogPostPage = () => {
  const urlString = window.location.href;
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [dateString, setDateString] = useState("");

  // 게시글의 상세정보 가져오기
  const getPostData = () => {
    const postID = urlString.split('/').pop();  // url의 마지막 주소를 읽어 게시글의 id를 식별
    axios  // GET 요청
      .get(`${process.env.REACT_APP_ARTICLE_URL}${postID}`)
      .then((Response) => {
        // console.log("게시글 상세정보:", Response.data);
        setPost((oldState) => {
          if (Response?.data !== undefined) {
            return Response.data;
          }
        })

        // 게시글의 생성날짜를 년월일로 변환
        setDateString((oldState) => {
          if (Response?.data !== undefined) {
            const date = new Date(Response.data.created_at);
            return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
          } 
        })
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  const getReplyData = () => {
    const postID = urlString.split('/').pop();
    axios  // GET 요청
      .get(`${process.env.REACT_APP_ARTICLE_URL}${postID}/comment`)
      .then((Response) => {
        console.log("댓글 상세정보:", Response.data);
        setReplies((oldState) => {
          if (Response?.data !== undefined) {
            return dummyReplies;
            // return Response.data;
          }
        })
      })
      .catch((Error) => {
        console.log(Error);
      });
  }
  useEffect(() => {
    getPostData();
    getReplyData();
  }, [])
  return (
    <div>
      {replies.map(reply => <Reply key={reply.id} reply={reply}/>)}
    </div>
  )
}

export default BlogPostPage;
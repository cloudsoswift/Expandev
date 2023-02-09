import { useEffect, useState } from "react";
import MainReply from "@/components/Blog/MainReply";
import { Link, useNavigate, useParams } from "react-router-dom";
import httpWithURL from "@/utils/http";
import PostViewer from "@/components/Blog/PostViewer";
import TagPill from "@/components/Blog/TagPill";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TagList from "../../components/Blog/TagList";
import AddReply from '@/components/Blog/AddReply';

const dummyReplies = [
  {
    id: 12,
    like_users_count: 0,
    liked: false,
    content: "ㅋ",
    created_at: "2023-01-19T07:39:44.848376Z",
    updated_at: "2023-01-19T07:39:44.848415Z",
    is_secret: false,
    article: 2,
    user: 3,
    username: "티코",
    user_thumbnail: "urlurl",
    parent_comment: null,
    like_users: [],
    recomments_count: 2
  },
  {
    id: 2,
    like_users_count: 1,
    liked: true,
    content: "zzzzz",
    created_at: "2023-01-19T05:43:00.625257Z",
    updated_at: "2023-01-19T05:43:00.625288Z",
    is_secret: false,
    article: 2,
    user: 3,
    username: "강아지",
    user_thumbnail: "urlurl",
    parent_comment: null,
    like_users: [3],
    recomments_count: 0
  },
];

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const BlogPostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [dateString, setDateString] = useState("");
  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // 게시글의 상세정보 가져오기
  const getPostData = () => {
    const postID = params.postId; // url의 마지막 주소를 읽어 게시글의 id를 식별
    // GET 요청
    httpWithURL(process.env.REACT_APP_ARTICLE_URL)
      .get(postID)
      .then((Response) => {
        // console.log("게시글 상세정보:", Response.data);
        setPost((oldState) => {
          if (Response?.data !== undefined) {
            return Response.data;
          }
        });

        // 게시글의 생성날짜를 년월일로 변환
        setDateString((oldState) => {
          if (Response?.data !== undefined) {
            const date = new Date(Response.data.created_at);
            return `${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일 ${
              DAYS[date.getDay()]
            }요일 ${date.getHours()}:${date.getMinutes()}`;
          }
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const getReplyData = () => {
    const postID = params.postId;
    setReplies(() => dummyReplies);
    // httpWithURL(process.env.REACT_APP_ARTICLE_URL) // GET 요청
    //   .get(`${7}/comment`)
    //   .then((Response) => {
    //     console.log("댓글 상세정보:", Response.data);
    //     setReplies((oldState) => {
    //       if (Response?.data !== undefined) {
    //         return Response.data;
    //       }
    //     });
    //   })
    //   .catch((Error) => {
    //     console.log("댓글 정보 가져오기 실패", Error);
    //   });
  };
  useEffect(() => {
    getPostData();
    getReplyData();
  }, []);

  // 좋아요 버튼 클릭 이벤트 핸들러
  const handleLike = () => {
    // 로그인 안 하고 좋아요 누를시 반려.
    if(!userInfo?.nickname){
      alert("로그인 한 유저만 가능합니다.");
      return;
    }
    httpWithURL(process.env.REACT_APP_BLOG_URL)
      .post(`article/${params.postId}/like`)
      .then((response) => {
        if (response.data?.liked) {
          setPost((prevPost) => {
            return { ...prevPost, liked: true, like_users_count: prevPost.like_users_count + 1};
          });
        } else {
          setPost((prevPost) => {
            return { ...prevPost, liked: false, like_users_count: prevPost.like_users_count - 1};
          });
        }
      }).catch((e)=>{
        alert("서버와 통신중 에러가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 글 삭제 버튼 클릭 이벤트 핸들러
  const handleDeletePost = () => {
    httpWithURL(process.env.REACT_APP_BLOG_URL)
    .delete(`article/${params.postId}`)
    .then((response) => {
      if(response.status === 204){
        alert("글 삭제에 성공했습니다!");
        navigate("/blog");
      }
    }).catch((e)=>{
      alert("글 삭제에 실패했습니다. 다시 시도해주세요.");
    });
  };

  const clearReplyInput = () => {
    
  }

  return (
    <div className="grid">
      <div className="border border-slate-700 w-4/5 justify-self-center p-4 rounded-xl">
        <div className="text-2xl text-center">{post.title}</div>
        <div className="text-sm text-end">{dateString}</div>
        <div className="text-sm text-gray-500 text-end">{`${post.hit}번 읽힌 글입니다.`}</div>
        <div className="text-xl text-end">{post.username}</div>
        <div></div>
        <div></div>
        <PostViewer content={post.content} />
        <div>
          {
            <TagList tagList={post.tags} />
          }
        </div>
        <div className="btn-area space-x-1">
          <button className="px-2 py-2 border border-slate-700 rounded-xl" onClick={handleLike}>
            {post.liked ? (
              <AiFillHeart className="inline" />
            ) : (
              <AiOutlineHeart className="inline" />
            )}
            {post.like_users_count}
          </button>
          {
            // 작성자 닉네임과 현재 로그인한 유저 닉네임이 같을 경우 수정, 삭제 버튼 표시
            userInfo && userInfo.nickname === post.username && (
              <span className="justify-self-end">
                <Link
                  to={`/blog/post/${params.postId}/edit`}
                  state={post}
                  className="px-6 py-3 mr-1 font-semibold bg-green-500 rounded-xl"
                >
                  수정
                </Link>
                <button
                  className="px-6 py-2 font-semibold bg-red-500 rounded-xl"
                  onClick={handleDeletePost}
                >
                  삭제
                </button>
              </span>
            )
          }
        </div>
        {userInfo && (
        <AddReply onHandleCancel={() => {}} />
        )}
        {replies.map((reply) => (
          <MainReply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostPage;
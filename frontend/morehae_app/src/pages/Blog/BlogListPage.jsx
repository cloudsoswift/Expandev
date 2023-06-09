import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import PostPreview from "@/components/Blog/PostPreview";
import { Link, useParams, useSearchParams } from "react-router-dom";
import httpWithURL from "@/utils/http";

const tabData = [
  {
    id: 0,
    title: "트렌드",
    link: ""
  },
  {
    id: 1,
    title: "최신",
    link: "/recent"
  }
]

const dummyTrend = {
  "articles": [
      {
          "id": 1,
          "username": "test1",
          "like_users_count": 0,
          "comments_count": 0,
          "liked": false,
          "tags": [],
          "title": "dsa",
          "content": "as",
          "created_at": "2023-01-31T12:55:28.647060+09:00",
          "updated_at": "2023-01-31T12:55:28.647103+09:00",
          "hit": 1,
          "user": 1,
          "like_users": []
      },
      {
          "id": 2,
          "username": "test1",
          "like_users_count": 0,
          "comments_count": 0,
          "liked": false,
          "tags": [],
          "title": "asdzx",
          "content": "das",
          "created_at": "2023-01-31T12:56:05.243007+09:00",
          "updated_at": "2023-01-31T12:56:05.243041+09:00",
          "hit": 1,
          "user": 1,
          "like_users": []
      }
  ],
  "articles_count": 2
}

const BlogListPage = () => {
  const [postListTrend, setPostListTrend] = useState([]);  // 트렌드 탭의 게시글 리스트
  const [postListRecent, setPostListRecent] = useState([]);  // 최신 탭의 게시글 리스트
  const [trendPage, setTrendPage] = useState(1);  // 트렌드 탭의 스크롤 페이지 번호
  const [recentPage, setRecentPage] = useState(1);  // 최신 탭의 스크롤 페이지 번호
  const [activeTabIndex, setActiveTabIndex] = useState(0);  // 활성화된 탭 인덱스
  const searchBoxRef = useRef(null);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 트렌드 탭의 게시글 리스트 가져오기
  const getTrendPostList = () => {
    axios
      .get(`${process.env.REACT_APP_BLOG_URL}?sort_type=hit&count=${trendPage}`)
      .then((Response) => {
        console.log("트렌드 탭 게시글 리스트:", Response.data.articles);
        setPostListTrend((oldState) => {
          if (Response?.data?.articles) {
            // return [...oldState, ...Response.data.articles];
            return [...Response.data.articles];
            // return dummyTrend.articles;
          } else {
            return oldState;
          }
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  // 최신 탭의 게시글 리스트 가져오기
  const getRecentPostList = () => {
    axios
      .get(`${process.env.REACT_APP_BLOG_URL}?sort_type=created_at&count=${recentPage}`)
      .then((Response) => {
        console.log("최신 탭 게시글 리스트:", Response.data.articles);
        setPostListRecent((oldState) => {
          if (Response?.data?.articles) {
            // return [...oldState, ...Response.data.articles];
            return [...Response.data.articles];
          } else {
            return oldState;
          }
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  // 태그 검색시 게시글 리스트 가져오기
  const getTagPostList = () => {
    axios
      .get(`${process.env.REACT_APP_BLOG_URL}tag-articles`, {
      params: {
        tags: params.tagName,
        count: searchParams.get("count"),
      },
    }).then((Response) => {
      setPostListTrend((oldState) => {
        if (Response?.data) {
          return [ ...Response.data];
        } else {
          return [];
        }
      });
    })
    .catch((Error) => {
      console.log(Error);
    });
  }

  useEffect(() => {
    // url 링크 파싱하여 적절한 탭으로 이동
    const urlStringList = window.location.href.split('/');
    if (urlStringList.includes("recent")) {
      setActiveTabIndex(1);
    }

    // 초기 데이터 로딩
    getTrendPostList();
    getRecentPostList();
  }, [])

  useEffect(() => {
    // 태그 검색일 경우 태그 검색 결과만 반영
    if(params.tagName){
      getTagPostList();
      return;
    }
  }, [searchParams, params])

  const handleFocus = () => {
    searchBoxRef.current.classList.replace('border-slate-700', 'border-green-500');
  };

  const handleBlur = () => {
    searchBoxRef.current.classList.replace('border-green-500', 'border-slate-700');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      /* 검색 API 보내고 받아올 것 */
      console.log(e.target.value);
      axios
      .get(`${process.env.REACT_APP_BLOG_URL}tag-articles`, {
        params: {
          count: searchParams.get("count"),
          search_title: e.target.value
        },
      }).then((Response) => {
        console.log(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
    }
  }

  const clickSearch = (e) => {
    /* 검색 API 보내고 받아올 것 */
    console.log(searchBoxRef.current.firstChild["value"]);
  }

  return (
    <div className="flex flex-col items-center min-w-[80rem] mt-8">
      <div>
        {/* 탭 UI */}
        <div className="ml-2 mr-2 border-b-2 border-slate-700 flex justify-between">
          <div>
            {!params.tagName && tabData.map((data, index) => 
              <Link to={"/blog" + data.link} key={data.id} >
                <button
                  onClick={() => setActiveTabIndex(index)}
                  className={`border-b-4 transition-colors duration-300 p-2
                  ${activeTabIndex === index ? 'font-bold border-green-500' : 'font-normal border-none'}`
                  }
                >
                  {data.title}
                </button>
              </Link>
            )}
            {params.tagName && <div><span className="border p-1 rounded-3xl transition-color duration-300 bg-purple-700 text-white inline-block hover:bg-purple-500">#{params.tagName}</span> 에 대한 검색 결과</div>}
          </div>
          {/* 검색 상자 UI */}
          <div ref={searchBoxRef} className="transition-colors duration-300 border-b-4 border-slate-700">
            <input placeholder="검색어 입력..." onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown} className="h-full bg-dark" />
            <button onClick={clickSearch} className="transition-colors mx-2 hover:text-green-300">검색</button>
          </div>
        </div>
        
        {/* 게시글 리스트 UI */}
        <div className="grid grid-cols-4">
          {activeTabIndex === 0 ?
            (postListTrend.length === 0 ? <div>트렌드 글 없음</div> : postListTrend.map(post => <Link key={post.id} to={`/blog/post/${post.id}`}><PostPreview post={post}/></Link>) ):
            (postListRecent.length === 0 ? <div>최신 글 없음</div> : postListRecent.map(post => <Link key={post.id} to={`/blog/post/${post.id}`}><PostPreview post={post}/></Link>) )
          }
        </div>
      </div>
    </div>
  )
}

export default BlogListPage;
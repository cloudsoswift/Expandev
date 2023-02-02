import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import PostPreview from "@/components/Blog/PostPreview";
import { BsSearch } from 'react-icons/bs'
import { Link } from "react-router-dom";

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

const BlogListPage = () => {
  const [postListTrend, setPostListTrend] = useState([]);  // 트렌드 탭의 게시글 리스트
  const [postListRecent, setPostListRecent] = useState([]);  // 최신 탭의 게시글 리스트
  const [trendPage, setTrendPage] = useState(1);  // 트렌드 탭의 스크롤 페이지 번호
  const [recentPage, setRecentPage] = useState(1);  // 최신 탭의 스크롤 페이지 번호
  const [activeTabIndex, setActiveTabIndex] = useState(0);  // 활성화된 탭 인덱스
  const searchBoxRef = useRef(null);

  // 트렌드 탭의 게시글 리스트 가져오기
  const getTrendPostList = () => {
    axios
      .get(`${process.env.REACT_APP_BLOG_URL}?sort_type=hit&count=${trendPage}`)
      .then((Response) => {
        console.log("트렌드 탭 게시글 리스트:", Response.data.articles);
        setPostListTrend((oldState) => {
          if (Response?.data?.articles) {
            return [...oldState, ...Response.data.articles];
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
            return [...oldState, ...Response.data.articles];
          } else {
            return oldState;
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

  const handleFocus = () => {
    searchBoxRef.current.classList.replace('border-gray-400', 'border-blue-500');
  };

  const handleBlur = () => {
    searchBoxRef.current.classList.replace('border-blue-500', 'border-gray-400');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      /* 검색 API 보내고 받아올 것 */
      console.log(e.target.value);
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
        <div className="ml-2 mr-2 border-b-2 flex justify-between">
          <div>
            {tabData.map((data, index) => 
              <Link to={"/blog" + data.link} key={data.id} >
                <button
                  onClick={() => setActiveTabIndex(index)}
                  className={`border-b-4 transition-colors duration-300 p-2
                  ${activeTabIndex === index ? 'font-bold border-blue-500' : 'font-normal border-none'}`
                  }
                >
                  {data.title}
                </button>
              </Link>
            )}
          </div>
          {/* 검색 상자 UI */}
          <div ref={searchBoxRef} className="transition rounded-md h-10 flex items-center text-sm border border-gray-400 p-2">
            <input type="text" placeholder="검색어 입력" onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown} className="h-full border-none" />
            <button onClick={clickSearch} className="w-8 h-full pl-4"><BsSearch/></button>
          </div>
        </div>
        
        {/* 게시글 리스트 UI */}
        <div className="flex flex-wrap w-[76rem]">
          {activeTabIndex === 0 ?
            (postListTrend.length === 0 ? <div>트렌드 글 없음</div> : postListTrend.map(post => <Link key={post.id} to={`/blog/post/${post.id}`}><PostPreview post={post}/></Link>) ):
            (postListTrend.length === 0 ? <div>최신 글 없음</div> : postListRecent.map(post => <Link key={post.id} to={`/blog/post/${post.id}`}><PostPreview post={post}/></Link>) )
          }
        </div>
      </div>
    </div>
  )
}

export default BlogListPage;
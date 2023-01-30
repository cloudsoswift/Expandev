import { useState, useEffect } from "react"
import axios from 'axios'
import PostPreview from "../../components/PostPreview/PostPreview";

const tabData = [
  {
    id: 0,
    title: "트렌드"
  },
  {
    id: 1,
    title: "최신"
  }
]

const BlogListPage = () => {
  const [postListTrend, setPostListTrend] = useState([]);  // 트렌드 탭의 게시글 리스트
  const [postListNew, setPostListNew] = useState([]);  // 최신 탭의 게시글 리스트
  const [trendNo, setTrendNo] = useState(1);  // 트렌드 탭의 스크롤 페이지 번호
  const [newNo, setNewNo] = useState(1);  // 최신 탭의 스크롤 페이지 번호
  const [activeTabIndex, setActiveTabIndex] = useState(0);  // 활성화된 탭 인덱스

  // 트렌드 탭의 게시글 리스트 가져오기
  const getPostList = () => {
    axios
      .get(`http://i8d212.p.ssafy.io:9000/blogs?count=${trendNo}`)
      .then((Response) => {
        console.log(Response.data.articles);
        setPostListTrend((oldState) => {
          return [...oldState, ...Response.data.articles];
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }
  
  useEffect(() => {
    getPostList();
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div>
        {/* 탭 UI */}
        <div className="ml-2 mr-2 border-b-2">
          {tabData.map((data, index) => 
            <button
              onClick={() => {setActiveTabIndex(index)}}
              className={`border-b-4 transition-colors duration-300 p-2
              ${activeTabIndex === index ? 'font-bold border-blue-500' : 'font-normal border-none'}`
              }
            >
              {data.title}
            </button>
          )}
        </div>
        
        {/* 게시글 리스트 UI */}
        <div>
          <div className="flex flex-wrap w-[76rem]">
            {activeTabIndex === 0 ?
            postListTrend.map(post => <PostPreview key={post.id} post={post}/>) :
            postListNew.map(post => <PostPreview key={post.id} post={post}/>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogListPage;
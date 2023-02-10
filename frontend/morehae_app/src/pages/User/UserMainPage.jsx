import { useEffect, useState } from "react";
import Tabs from "@/components/Tab/Tabs";
import HttpWithURL from "@/utils/http";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const UserMainPage = () => {
  const [userProfile, setUserProfile] = useState();
  const [userRoadmap, setUserRoadmap] = useState();
  const [userBlog, setUserBlog] = useState();

  // URL에서 유저닉네임 받아옴
  const someUser = useParams();

  const getProfile = () => {
    HttpWithURL(process.env.REACT_APP_USER_URL)
      .get(`user/${someUser?.nickname}/profile`)
      .then((res) =>
        setUserProfile(() => {
          console.log(res.data, "data");
          return res.data;
        })
      )
      .catch((err) => console.log(err));
  };

  const getRoadmapTab = (nickname) => {
    HttpWithURL(process.env.REACT_APP_USER_URL)
      .get(`user/${someUser?.nickname}/roadmaps`)
      .then((res) =>
        setUserRoadmap(() => {
          // console.log(res.data, "roadmap");
          return res.data;
        })
      )
      .catch((err) => console.log(err));
  };

  const getBlogTab = () => {
    HttpWithURL(process.env.REACT_APP_USER_URL)
      .get(`user/${someUser?.nickname}/blogs`)
      .then((res) =>
        setUserBlog(() => {
          // console.log(res.data, "roadmap");
          return res.data;
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
    getRoadmapTab();
    getBlogTab();
  }, []);

  console.log(userProfile, "profile");
  console.log(userRoadmap, "roadmap");
  console.log(userBlog, "blog");

  return (
    <div className="flex w-auto h-full justify-center bg-dark ">
      <div className="m-8 w-2/3 h-auto p-4 shadow-lg rounded-lg bg-[rgb(32,37,42)] border border-[rgb(71,79,88)] drop-shadow-sm">
        <div>
          <div className="relative grid grid-cols-3 h-20 bg-[rgb(32,37,42)] justify-center">
            <div>
              <img
                className=" mt-2 h-36 w-36 rounded-full m-auto border-8 border-green-500 bg-auto "
                // src={`http://i8d212.p.ssafy.io:8000${userProfile?.profile_image}`}
                src="https://ilovecharacter.com/news/data/20200717/p179567596843535_917_h.jpg?1625108055389"
                alt="img"
              />
            </div>
            <div className="mt-9 m-2">
              <span className="mx-4 text-lg">{userProfile?.nickname}admin</span>
              <span className="mr-2 text-sm text-gray-400">
                {userProfile?.position}프론트엔드
              </span>
            </div>
            <div className="mt-9 m-2 text-right">
              {/* <Link

                to='edit'
                className="px-3 py-1 rounded-md shadow-md text-xs text-white bg-green-500 hover:bg-green-700 drop-shadow-md"
              >
                회원정보수정
              </Link> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3  bg-green-500 shadow-md rounded-md h-auto p-3 shadow-green-500/50">
          <div className="empty"></div>
          <div className="col-span-2 ">
            <div className=" bg-white m-2 p-2 rounded-md shadow-md max-h-48 text-black text-sm">
              {userProfile?.introduce} 안녕하세요!
            </div>
            <div className="grid grid-cols-2 text-black">
              <div className="flex justify-center text-center shadow-md bg-white m-2 p-2 rounded-md">
                <div className="mx-1 w-full text-xs  ">
                  클리어한 노드
                  <div>{userProfile?.clear_nodes_count}0</div>
                </div>
                <div className="mx-1 w-full text-xs">
                  로드맵 즐겨찾기
                  <div>{userProfile?.favorite_roadmaps_count}0</div>
                </div>
              </div>
              <div className="flex justify-center text-center shadow-md bg-white m-2  p-2 rounded-md">
                <div className="mx-1 w-full text-xs">
                  작성한 게시글
                  <div>{userProfile?.post_reviews_count}0</div>
                </div>
                <div className="mx-1 w-full text-xs">
                  좋아요한 게시글
                  <div>{userProfile?.like_articles_count}0</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs userRoadmap={userRoadmap} userBlog={userBlog} />
      </div>
    </div>
  );
};

export default UserMainPage;

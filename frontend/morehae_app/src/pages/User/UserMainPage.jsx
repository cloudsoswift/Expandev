import { useEffect, useState } from "react";
import Tabs from "@/components/Tab/Tab";
import axios from "axios";
import { useSelector } from "react-redux";

const UserMainPage = () => {
  const [userProfile, setUserProfile] = useState();
  const [userRoadmap, setUserRoadmap] = useState();
  const [userBlog, setUserBlog] = useState();

  const userInfo = useSelector((state) => state.user.user);
  const userNickname = userInfo.nickname;

  useEffect(() => {
    axios
      .get(`http://i8d212.p.ssafy.io:9000/accounts/user/jina/profile`)
      .then((res) =>
        setUserProfile(() => {
          // console.log(res.data, "data");
          return res.data;
        })
      )
      .catch((err) => console.log(err));

    axios
      .get(`http://i8d212.p.ssafy.io:9000/accounts/user/jina/roadmaps`)
      .then((res) =>
        setUserRoadmap(() => {
          console.log(res.data, "roadmap");
          return res.data;
        })
      )
      .catch((err) => console.log(err));

    axios
      .get(`http://i8d212.p.ssafy.io:9000/accounts/user/jina/blogs`)
      .then((res) =>
        setUserBlog(() => {
          console.log(res.data, "blog");
          return res.data;
        })
      )
      .catch((err) => console.log(err));
  }, []);

  // /media/%EA%B5%AC%EB%AF%B8_2%EB%B0%98_%EC%98%A4%EC%A7%80%EB%82%98.JPG
  // ${userProfile?.profile_image}
  const profile_img = `{% static ${userProfile?.profile_image} %}`;

  return (
    <div className="flex w-auto h-full justify-center m-8 rounded-lg bg-white ">
      <div className="w-2/3 h-auto p-4 shadow-lg rounded-lg ">
        <div>
          <div className="relative grid grid-cols-3 h-20 bg-white  justify-center">
            <div>
              <img
                className=" h-40 w-40 rounded-full p-1 m-auto shadow-md "
                // src={profile_img}
                alt="img"
              />
            </div>
            <div className="mt-9 m-2">
              <span className="mx-4 text-lg">{userProfile?.nickname}</span>
              <span className="mr-2 text-sm text-gray-600">
                {userProfile?.position}
              </span>
            </div>
            <div className="mt-9 m-2 text-right">
              <button className="px-3 py-1 rounded-md shadow-md text-xs text-white bg-blue-400 hover:bg-blue-500 ">
                회원정보수정
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3  bg-blue-300 shadow-md rounded-md h-auto p-3">
          <div className="empty"></div>
          <div className="col-span-2 ">
            <div className=" bg-white m-2 p-2 rounded-md shadow-md max-h-48 text-sm">
              {userProfile?.introduce}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex justify-center text-center shadow-md bg-white m-2 p-2 rounded-md">
                <div className="mx-1 w-full text-xs ">
                  클리어한 노드
                  <div>정보x</div>
                </div>
                <div className="mx-1 w-full text-xs">
                  로드맵 즐겨찾기
                  <div>정보X</div>
                </div>
              </div>
              <div className="flex justify-center text-center shadow-md bg-white m-2  p-2 rounded-md">
                <div className="mx-1 w-full text-xs">
                  작성한 게시글
                  <div>{userProfile?.post_reviews_count}</div>
                </div>
                <div className="mx-1 w-full text-xs">
                  좋아요한 게시글
                  <div>{userProfile?.like_articles_count}</div>
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

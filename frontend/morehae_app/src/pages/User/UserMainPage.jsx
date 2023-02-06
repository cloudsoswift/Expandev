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
      .get(`http://i8d212.p.ssafy.io:8000/accounts/user/jina/profile`)
      .then((res) =>
        setUserProfile(() => {
          // console.log(res.data, "data");
          return res.data;
        })
      )
      .catch((err) => console.log(err));

    axios
      .get(`http://i8d212.p.ssafy.io:8000/accounts/user/jina/roadmaps`)
      .then((res) =>
        setUserRoadmap(() => {
          // console.log(res.data, "roadmap");
          return res.data;
        })
      )
      .catch((err) => console.log(err));

    axios
      .get(`http://i8d212.p.ssafy.io:8000/accounts/user/jina/blogs`)
      .then((res) =>
        setUserBlog(() => {
          // console.log(res.data, "blog");
          return res.data;
        })
      )
      .catch((err) => console.log(err));
  }, []);


  console.log(userInfo)
  const profile_img = `http://i8d212.p.ssafy.io:9000${userProfile?.profile_image}`;

  return (
    <div className="flex w-auto h-full justify-center bg-dark ">
      <div className="m-8 w-2/3 h-auto p-4 shadow-lg rounded-lg bg-[rgb(32,37,42)] border border-[rgb(71,79,88)] drop-shadow-sm">
        <div>
          <div className="relative grid grid-cols-3 h-20 bg-[rgb(32,37,42)] justify-center">
            <div>
              <img
                className=" mt-2 h-36 w-36 rounded-full m-auto "
                // src={profile_img}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                alt="img"
              />
            </div>
            <div className="mt-9 m-2">
              <span className="mx-4 text-lg">{userProfile?.nickname}rgr</span>
              <span className="mr-2 text-sm text-gray-400">
                {userProfile?.position}dgsef
              </span>
            </div>
            <div className="mt-9 m-2 text-right">
              <button className="px-3 py-1 rounded-md shadow-md text-xs text-white bg-green-500 hover:bg-green-700 drop-shadow-md">
                회원정보수정
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3  bg-green-500 shadow-md rounded-md h-auto p-3 shadow-green-500/50">
          <div className="empty"></div>
          <div className="col-span-2 ">
            <div className=" bg-white m-2 p-2 rounded-md shadow-md max-h-48 text-black text-sm">
              {userProfile?.introduce}
              안녕하세요
            </div>
            <div className="grid grid-cols-2 text-black">
              <div className="flex justify-center text-center shadow-md bg-white m-2 p-2 rounded-md">
                <div className="mx-1 w-full text-xs  ">
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

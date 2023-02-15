import React, { useState, useEffect } from "react";
import HttpWithURL from "@/utils/http";
import { useNavigate } from "react-router-dom";

const UserInfoEditPage = () => {
  const [profileImg, setProfileImg] = useState("");
  const [introduce, setIntroduce] = useState("");

  const navigate = useNavigate();

  const handleProfileImgChange = (e) => {
    const imgFile = e.target.files[0];
    setProfileImg(imgFile);
    console.log(imgFile);
  };
  console.log(profileImg);

  const handleChangeProfile = (e) => {
    // img 파일을 보내기 위해서는 FormData에 담아서 보내야 함
    let formData = new FormData();
    console.log(profileImg, introduce, "datas");
    formData.append("profile_image", profileImg);
    formData.append("introduce", introduce);

    HttpWithURL(process.env.REACT_APP_USER_URL)
      .put("profile", formData, {
        // formData를 보낼대 헤더에 content-type을 추가해야함
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("프로필을 수정하였습니다");
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=> {
    console.log(profileImg, "image")
  },[profileImg])

  // 썸네일 이미지 미리보기(blogpostpage)
  // 기존 이미지 가져오기(blogeditpage)


  return (
    <div>
      <div className="flex w-auto h-full justify-center  bg-dark ">
        <div className="m-8 w-1/2 h-auto p-4 shadow-lg rounded-lg bg-[rgb(32,37,42)] border border-[rgb(71,79,88)] drop-shadow-sm">
          <div>
            <input
              className="rounded-lg"
              type="file"
              onChange={handleProfileImgChange}
              accept="image/png, image/jpeg"

            />
          </div>
          <div>
            <img
              className="h-16 w-16 object-contain"
              src={profileImg}
              alt="이미지"
            />
          </div>
          <div>
            <textarea
              className="text-black rounded-lg"
              placeholder="자기소개를 작성해주세요"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </div>
          <div>
            <button className="" onClick={handleChangeProfile}>제출</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditPage;

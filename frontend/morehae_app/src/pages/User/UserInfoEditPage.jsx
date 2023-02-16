import React, { useState, useEffect } from "react";
import HttpWithURL from "@/utils/http";
import { useLocation, useNavigate } from "react-router-dom";
import httpWithURL from "@/utils/http";
import { useSelector } from "react-redux";

const UserInfoEditPage = () => {
  const userInfo = useSelector(state=>state.user.user);

  const navigate = useNavigate();
  const locate = useLocation();
  
  const originalProfile = locate.state;

  const [profileImg, setProfileImg] = useState("");
  const [profileImgPreview, setProfileImgPreview] = useState("");
  const [introduce, setIntroduce] = useState(originalProfile?.introduce);

  const handleProfileImgChange = (e) => {
    const imgFile = e.target.files[0];
    setProfileImg(imgFile);
    console.log(imgFile);
    setProfileImagePreview(imgFile);
  };

  const setProfileImagePreview = (file) => {
    const reader = new FileReader();
    if (!file) {
      setProfileImg(file);
      return;
    }
    reader.onloadend = () => {
      setProfileImg(file);
      setProfileImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeProfile = (e) => {
    // img 파일을 보내기 위해서는 FormData에 담아서 보내야 함
    let formData = new FormData();
    // console.log(profileImg, introduce, "datas");
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
        // console.log(res);
        alert("프로필을 수정하였습니다");
        navigate(-1);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(()=>{
    if (!locate.state || locate.state?.nickname !== userInfo.nickname || !userInfo?.nickname) {
      alert("비정상적인 접근입니다.");
      navigate(`/user/${locate.state?.nickname}`);
    }
    if(originalProfile.profile_image){
      const loadExistProfileImg = async() => {
        const existProfileImg = await httpWithURL(process.env.REACT_APP_SERVER_URL).get(originalProfile.profile_image, {responseType: 'blob'});
        console.log(existProfileImg);
        const existProfileImgBlob = await existProfileImg.data;
        setProfileImg(new File([existProfileImgBlob], originalProfile.profile_image.split('/').at(-1), { type:existProfileImgBlob.type}))
      }
      loadExistProfileImg();
    }
  }, [locate, userInfo, originalProfile]);

  // 썸네일 이미지 미리보기(blogpostpage)
  // 기존 이미지 가져오기(blogeditpage)

  return (
    <div>
      <div className="flex w-auto h-full justify-center  bg-dark ">
        <div className="m-8 w-1/2 h-auto p-4 shadow-lg rounded-lg bg-[rgb(32,37,42)] border border-[rgb(71,79,88)] drop-shadow-sm grid grid-cols-2">
          <div>
            이미지
            <input
              className="rounded-lg"
              type="file"
              onChange={handleProfileImgChange}
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="row-span-2">
            자기소개
            <textarea
              className="text-black rounded-lg w-full h-full"
              placeholder="자기소개를 작성해주세요"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </div>
          <div className="text-center mt-5  ">
            {profileImgPreview && (
              <img
                className="h-40 w-40 object-contain inline-block"
                src={profileImgPreview}
                alt="이미지"
              />
            )}
          </div>
          <div className="w-full col-span-2">
            <button
              className="w-full text-center p-2 rounded-xl mt-10 bg-green-500"
              onClick={handleChangeProfile}
            >
              제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditPage;

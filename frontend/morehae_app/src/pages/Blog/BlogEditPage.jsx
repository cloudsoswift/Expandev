import "@toast-ui/editor/dist/toastui-editor.css";
import { useState } from "react";
import httpWithURL from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useLocation, useNavigate } from "react-router-dom";
import PostEditor from "../../components/Blog/PostEditor";
import InputThumbnail from "../../components/Blog/InputThumbnail";
import InputTitle from "../../components/Blog/InputTitle";
import InputOverview from "../../components/Blog/InputOverview";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const BlogEditPage = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const userInfo = useSelector((state) => state.user.user);

  // useLocation의 state값은 있을 수도, 없을 수도(링크 직접 입력을 통한 비정상적인 접근) 있으므로
  // 렌더링시 에러 막기위해 옵셔널 체이닝으로 없는 경우 "" 또는 [] 할당하도록 설정함.
  const originalPost = locate.state;
  
  // 제목 관련 State
  const [title, setTitle] = useState(originalPost?.title ? originalPost?.title : "");
  const [titleIsValid, setTitleIsValid] = useState(true);
  // 요약글 관련 State
  const [overview, setOverview] = useState(originalPost?.overview ? originalPost?.overview : "");
  const [overviewIsValid, setOverviewIsValid] = useState(true);
  // Thumbnail 관련 State
  const [thumbnail, setThumbnail] = useState("");
  
  const [tags, setTags] = useState(originalPost?.tags ? originalPost?.tags : []);
  const [editor, setEditor] = useState();
  const request = httpWithURL(process.env.REACT_APP_BLOG_URL);
  // const request = httpWithURL("http://i8d212.p.ssafy.io:9000/blogs");

  useEffect(() => {
    // 수정 버튼을 통해 이동해온게 아니거나, 원글 작성자와 현재 로그인한 유저 다른경우
    // 블로그 메인 페이지로 강제 이동시킴.
    if (!locate.state || locate.state?.username !== userInfo.nickname || !userInfo?.nickname) {
      alert("비정상적인 접근입니다.");
      navigate("/blog");
    }
    const loadExistThumbnail = async() => {
      const existThumbnail = await httpWithURL(process.env.REACT_APP_SERVER_URL).get(originalPost.thumbnail, {responseType: 'blob'});
      console.log(existThumbnail);
      const existThumbnailBlob = await existThumbnail.data;
      setThumbnail(new File([existThumbnailBlob], originalPost.thumbnail.split('/').at(-1), { type:existThumbnailBlob.type}))
    }
    loadExistThumbnail();
  }, [locate, userInfo]);
  
  const handleSendEditPost = () => {
    if (!titleIsValid) {
      alert("제목이 올바르지 않습니다.");
      return;
    } else if (!overviewIsValid) {
      alert("요약글이 올바르지 않습니다.");
      return;
    } else if (editor.getMarkdown().trim().length === 0){
      alert("글 내용은 공란일 수 없습니다.");
      return;
    }
    let body = new FormData();
    body.append("title", title.trim());
    body.append("content", editor.getMarkdown());
    if (overviewIsValid) {
      body.append("overview", overview);
    }
    if (thumbnail) {
      body.append("thumbnail", thumbnail);
    }
    for (let tag of tags) {
      body.append("tags", tag.tag);
    }
    request
      .put(`/article/${originalPost?.id}`, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        switch (response.status) {
          case 201:
            alert("글 수정에 성공했습니다!");
            navigate("/blog/");
            break;
          default:
            break;
        }
      });
  };

  return (
    <div className="flex justify-center">
      <div className="h-full w-1/2">
        <div className="text-2xl mb-4 text-center">글 쓰기</div>
        <div className="input-form">
          <InputTitle onChange={setTitle} value={title} setValid={setTitleIsValid}/>
          <div className="grid grid-cols-2">
            <InputThumbnail onChange={setThumbnail} value={thumbnail}/>
            <InputOverview onChange={setOverview} setValid={setOverviewIsValid} value={overview}/>
          </div>
          <div className="mt-8">
            <TagCombobox onAddTag={setTags} tagList={tags} />
          </div>
          <div className="h-full my-1">
            <TagList tagList={tags} onDelete={setTags} />
          </div>
        </div>
        <PostEditor content={originalPost?.content ? originalPost?.content : ""} onMount={setEditor} />
        <div className="btn-area grid place-items-end mt-4">
          <button
            className="rounded-lg p-2 px-6 bg-green-500 font-semibold text-white"
            onClick={handleSendEditPost}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditPage;

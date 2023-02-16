import { useState } from "react";
import httpWithURL from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useNavigate } from "react-router-dom";
import PostEditor from "../../components/Blog/PostEditor";
import InputThumbnail from "../../components/Blog/InputThumbnail";
import InputTitle from "../../components/Blog/InputTitle";
import InputOverview from "../../components/Blog/InputOverview";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BlogWritePage = () => {
  const navigate = useNavigate();
  // 제목 관련 State
  const [title, setTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(false);
  // 요약글 관련 State
  const [overview, setOverview] = useState("");
  const [overviewIsValid, setOverviewIsValid] = useState(false);
  // Thumbnail 관련 State
  const [thumbnail, setThumbnail] = useState("");
  // 태그 관련 State
  const [tags, setTags] = useState([]);
  const [editor, setEditor] = useState();
  const request = httpWithURL(process.env.REACT_APP_BLOG_URL);

  const userInfo = useSelector((state)=>state.user.user);
  // 게시물 등록 이벤트 핸들러
  const handleSendPost = () => {
    console.log("ddd");
    // 제목이나 요약글이 Valid 하지 않으면 진행하지 않음.
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
      .post("/article", body, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        switch (response.status) {
          case 201:
            alert("글 등록에 성공했습니다!");
            navigate("/blog/");
            break;
          default:
            break;
        }
      });
  };
  useEffect(() => {
    // 로그인 하지 않고 진입시 블로그 메인 페이지로 강제 이동시킴.
    if(!userInfo?.nickname) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [userInfo]);
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
        <PostEditor onMount={setEditor} />
        <div className="btn-area grid place-items-end mt-4">
          <button
            className="rounded-lg p-2 px-6 bg-green-500 font-semibold text-white"
            onClick={handleSendPost}
          >
            등록
          </button>
        </div>
      </div>
    </div>
    

  );
};

export default BlogWritePage;

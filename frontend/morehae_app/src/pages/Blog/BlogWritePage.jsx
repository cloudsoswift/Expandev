import "@toast-ui/editor/dist/toastui-editor.css";
import { useState } from "react";
import httpWithURL from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useNavigate } from "react-router-dom";
import PostEditor from "../../components/Blog/PostEditor";
import InputThumbnail from "../../components/Blog/InputThumbnail";
import InputTitle from "../../components/Blog/InputTitle";
import InputOverview from "../../components/Blog/InputOverview";

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

  const [tags, setTags] = useState([]);
  const [editor, setEditor] = useState();
  // const request = http(process.env.REACT_APP_BLOG_URL);
  const request = httpWithURL("http://i8d212.p.ssafy.io:9000/blogs");

  //
  const handleSendPost = () => {
    if (!titleIsValid) {
      return;
    }
    let body = new FormData();
    body.append("title", title.trim());
    body.append("content", editor.getMarkdown());
    if (!overviewIsValid) {
      body.append("overview", "");
    }
    if (!thumbnail) {
      body.append("thumnail", thumbnail);
    }
    for (let tag of tags) {
      body.append("tags", tag);
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
  return (
    <div className="min-h-screen h-full mx-1">
      <div className="text-2xl mb-4 text-center">글 쓰기</div>
      <div className="input-form">
        <div>
          <InputTitle onChange={setTitle} value={title} setValid={setTitleIsValid}/>
          <div className="grid grid-cols-2 border rounded-lg p-1">
            <InputThumbnail onChange={setThumbnail} value={thumbnail}/>
            <InputOverview onChange={setOverview} setValid={setOverviewIsValid} value={overview}/>
          </div>
        </div>
        <div>
          <TagCombobox onAddTag={setTags} tagList={tags} />
        </div>
        <div className="h-full my-1">
          <TagList TagList={tags} onDelete={setTags} />
        </div>
      </div>
      <PostEditor onMount={setEditor} />
      <div className="btn-area grid place-items-end mt-4">
        <button
          className="border rounded-lg p-2 px-6 bg-blue-500 text-white"
          onClick={handleSendPost}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default BlogWritePage;

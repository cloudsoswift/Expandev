import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect } from "react";
import { useState } from "react";
import httpWithURL from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "../../components/Blog/PostEditor";


const BlogWritePage = () => {
  const navigate = useNavigate();
  // 제목 관련 State
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState("");
  // 요약글 관련 State
  const [overview, setOverview] = useState("");
  // Thumbnail 관련 State
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailSrc, setThumbailSrc] = useState("");
  const [tags, setTags] = useState([]);
  const [editor, setEditor]= useState();                                                                                                                                                                         
  // const request = http(process.env.REACT_APP_BLOG_URL);
  const request = httpWithURL("http://i8d212.p.ssafy.io:9000/blogs");


  // 제목 관련 Handler 및 Valicdation 값
  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTitleInputBlur = (e) => {
    setTitleTouched(true);
  };
  // - 제목 Validation을 위한 값
  const titleIsEmpty = title.trim() === "";
  const titleMaxLengthValid = title.trim().length < 100;
  const titleIsValid = !titleIsEmpty && titleMaxLengthValid;

  // 요약글(overview) 관련 Handler
  const handleOverviewChange = (e) => {
    setOverview(e.target.value);
  };
  const overviewIsEmpty = overview.trim() === "";
  const overviewMaxLengthValid = overview.trim().length;

  // thumbnail 이미지 관련 Handler
  const handleThumbnailChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      setThumbnail(file);
      setThumbailSrc(file);
      return;
    }
    reader.onloadend = () => {
      setThumbnail(file);
      setThumbailSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //
  const handleSendPost = () => {
    if (!titleIsValid) {
      return;
    }
    let body = new FormData();
    body.append("title", title.trim());
    body.append("content", editor.getMarkdown());
    if (!overviewIsEmpty) {
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
          <span className="text-sm text-gray-500">
            제목
            <br />
          </span>
          <input
            className="px-3 py-2 bg-white text-2xl rounded-md shadow-sm placeholder-slate-40 w-full"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleInputChange}
            onBlur={handleTitleInputBlur}
          />
          {!titleIsValid && titleTouched && (
            <div className="text-xs text-red-500">
              {titleIsEmpty
                ? "제목은 필수입니다."
                : "제목은 100자 이하여야 합니다."}
            </div>
          )}
          <div className="grid grid-cols-2 border rounded-lg p-1">
            <div className="h-60 py-2">
              <span className="text-sm text-gray-500">
                (선택)썸네일 파일 첨부
                <br />
              </span>
              <div className="grid grid-cols-2 h-full border rounded-lg p-1">
                <input
                  className="file:border-0 file:py-2 file:px-4 file:rounded-lg"
                  type="file"
                  onChange={handleThumbnailChange}
                  accept="image/png, image/jpeg"
                />
                <div className="h-full border overflow-hidden">
                  {thumbnail && (
                    <img
                      className="w-full h-full object-contain"
                      src={thumbnailSrc}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="h-60 py-2">
              <span className="text-sm text-gray-500">
                (선택)글 요약
                <br />
              </span>
              <textarea
                className="px-3 py-2 border bg-white text-2xl rounded-md shadow-sm placeholder-slate-40 w-full h-full resize-none"
                placeholder="글 요약을 입력해주세요."
                value={overview}
                onChange={handleOverviewChange}
              />
            </div>
          </div>
        </div>
        <div>
          <TagCombobox onAddTag={setTags} tagList={tags}/>
        </div>
        <div className="h-full my-1">
          <TagList TagList={tags} onDelete={setTags} />
        </div>
      </div>
      <PostEditor onMount={setEditor}/>
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

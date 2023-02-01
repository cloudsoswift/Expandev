import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect } from "react";
import { useState } from "react";
import http from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MAX_UPLOAD_IMAGE_SIZE = 5242880; // 1024 * 1024 * 5. 5MB로 제한
const IMAGE_TYPES = ["image/png", "image/jpeg"];
const BlogWritePage = () => {
  const editorRef = useRef();
  const navigate = useNavigate();
  const [editor, setEditor] = useState();
  const [isEditorRendered, setisEditorRendered] = useState(false);
  // 제목 관련 State
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState("");
  // 요약글 관련 State
  const [overview, setOverview] = useState("");
  const [tags, setTags] = useState([]);
  const request = http(process.env.REACT_APP_BLOG_URL);
  console.log(request.defaults);
  const hookMap = {
    addImageBlobHook: (blob, callback) => {
      console.log(blob);
      console.log(blob.size);
      console.log(encodeURIComponent(blob.name));
      if (blob.size > MAX_UPLOAD_IMAGE_SIZE) {
        alert("첨부하는 이미지는 5MB 이하여야 합니다.");
        return;
      }
      if (!IMAGE_TYPES.includes(blob.type)) {
        alert("이미지는 png, jpeg, jpg 형식만 첨부할 수 있습니다.");
        return;
      }
      // if
      const body = {
        image: blob,
      };
      request
        .post("article/temp-img", body, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.json())
        .then((data) => {
          callback(data, blob.name);
        })
        .catch((e) => {
          callback("image-load-fail", "이미지 로딩 실패.");
        });
    },
  };

  // editorRef가 할당되어 있는 element(<div ref={editorRef} />)가 mount 되어 있어야 new Editor()를 통해
  // 에디터 생성하고 보여주는게 가능하므로 useEffect에서 new Editor를 통한 에디터 객체 생성.
  useEffect(() => {
    // 컴포넌트 함수 재 호출(재 렌더링)시 editor 또 생성되는거 방지.
    if (isEditorRendered) {
      return;
    }
    setEditor(
      new Editor({
        el: editorRef.current,
        previewStyle: "vertical",
        minHeight: "600px",
        hideModeSwitch: true,
        hooks: hookMap,
        placeholder: "내용을 입력해주세요.",
        // toolbarItems: [
        //   // 툴바 옵션 설정
        //   ["heading", "bold", "italic", "strike"],
        //   ["hr", "quote"],
        //   ["ul", "ol", "task", "indent", "outdent"],
        //   ["table", "image", "link"],
        //   ["code", "codeblock"],
        // ],
      })
    );
    setisEditorRendered(true);
  }, []);

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
  const overviewMaxLengthValid = overview.trim().length ;

  //
  const handleSendPost = () => {
    if (!titleIsValid) {
      return;
    }
    let body = new FormData();
    body.append("title", title.trim());
    body.append("content", editor.getMarkdown());
    if (overview !== "") {
      body.append("overview", "");
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
    <div className="min-h-screen h-full">
      <div className="text-2xl mb-4 text-center">글 쓰기</div>
      <div className="input-form">
        <div>
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
          <div>
            <textarea
              className="px-3 py-2 border bg-white text-xl rounded-md shadow-sm placeholder-slate-40 w-1/3 resize-none"
              rows="4"
              placeholder="(선택)글 요약을 입력해주세요."
              value={overview}
              onChange={handleOverviewChange}
            />
          </div>
        </div>
        <div>
          <TagCombobox onAddTag={setTags} />
        </div>
        <div className="h-full my-1">
          <TagList TagList={tags} onDelete={setTags} />
        </div>
      </div>
      <div ref={editorRef} />
      <div className="btn-area grid place-items-end mt-4 mr-2">
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

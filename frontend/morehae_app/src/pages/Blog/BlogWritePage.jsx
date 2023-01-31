import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect } from "react";
import { useState } from "react";
import http from "@/utils/http";
import TagCombobox from "@/components/Blog/TagCombobox";
import TagList from "../../components/Blog/TagList";
import { useRef } from "react";
const MAX_UPLOAD_IMAGE_SIZE = 5242880; // 1024 * 1024 * 5. 5MB로 제한

const BlogWritePage = () => {
  const editorRef = useRef();
  const [editor, setEditor] = useState();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [isEditorRendered, setisEditorRendered] = useState(false);
  const hookMap = {
    addImageBlobHook: (blob, callback) => {
      // console.log(blob);
      // const u = URL.createObjectURL(blob);
      // console.log(u);
      // imageRef.current.src = u;
      // callback(u, "이미지");
      alert("하이")
    },
  };

  // editorRef가 할당되어 있는 element(<div ref={editorRef} />)가 mount 되어 있어야 new Editor()를 통해
  // 에디터 생성하고 보여주는게 가능하므로 useEffect에서 new Editor를 통한 에디터 객체 생성.
  useEffect(() => {
    if (isEditorRendered){
      return;
    }
    console.log("ㅎㅇ.");
    // 컴포넌트 함수 재 호출(재 렌더링)시 editor 또 생성되는거 방지.
    setEditor(
      new Editor({
        el: editorRef.current,
        previewStyle: "vertical",
        height: "600px",
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

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
    console.log();
  };

  const handleSendPost = () => {
    let body = new FormData();
    body.append("title", title);
    body.append("content", editor.getMarkdown());
    for (let tag of tags) {
      body.append("tags", tag);
    }
    http(process.env.REACT_APP_BLOG_URL)
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
          />
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
        <button className="border rounded-lg p-2 px-6" onClick={handleSendPost}>
          전송
        </button>
      </div>
    </div>
  );
};

export default BlogWritePage;

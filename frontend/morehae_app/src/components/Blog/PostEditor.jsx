import { useEffect, useState } from "react";
import { useRef } from "react";
import httpWithURL from "@/utils/http";
import Editor from "@toast-ui/editor";

const MAX_UPLOAD_IMAGE_SIZE = 5242880; // 1024 * 1024 * 5. 5MB로 제한
const IMAGE_TYPES = ["image/png", "image/jpeg"];

const PostEditor  = ({content}) => {
  const editorRef = useRef();
  const [editor, setEditor] = useState();
  // const [isEditorRendered, setisEditorRendered] = useState(false);
  const request = httpWithURL("http://i8d212.p.ssafy.io:9000/blogs");

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
        .then((response) => response.data)
        .then((data) => {
          // callback(`${process.env.REACT_APP_SERVER_URL}${data.image}`, blob.name);
          callback(`${"http://i8d212.p.ssafy.io:9000"}${data.image}`, blob.name);
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
    if (editor) {
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
      })
    );
  }, []);
  return <div className="h-screen" id="post-editor" ref={editorRef}/>
}

export default PostEditor;
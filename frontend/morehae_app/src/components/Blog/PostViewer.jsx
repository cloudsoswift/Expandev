import Editor from "@toast-ui/editor";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const PostViewer = ({ content }) => {
  const viewerRef = useRef();
  const [viewer, setViewer] = useState();
  const [context, setContext] = useState(content);
  useEffect(() => {
    setContext(content);
    if (viewer) {
      return;
    }
    setViewer(
      new Editor.factory({
        el: viewerRef.current,
        viewer: true,
        initialValue: context,
        height: "600px",
        theme: "dark",
      })
    );
  }, [content]);
  useEffect(() => {
    if (viewer) {
      viewer.setMarkdown(context);
    }
  }, [context]);
  return (
    <div className="border border-slate-700 my-4 p-4">
      <div id="post-viewer" className="h-max" ref={viewerRef} />
    </div>
  );
};

export default PostViewer;

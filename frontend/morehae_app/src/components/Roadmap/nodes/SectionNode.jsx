import { memo } from "react";

const SectionNode = ({ data }) => {
  console.log(data);
  return (
    <div
      className={
        "px-2 py-2 shadow-md border-2 bg-slate-400 w-full h-full text-center opacity-20"
      }
    >
    </div>
  );
};

export default memo(SectionNode);

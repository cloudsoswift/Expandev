import { memo } from "react";

const SectionNode = ({ data }) => {
  return (
    <div
      className={
        "px-2 py-2 shadow-md border-2 w-full h-full text-center text-9xl"
      }
    >
      {data.label}
    </div>
  );
};

export default memo(SectionNode);

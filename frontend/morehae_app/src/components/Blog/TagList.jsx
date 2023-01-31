import { useEffect } from "react";
import { useState } from "react";
import TagPill from "./TagPill";

const TagList = ({TagList, onDelete}) => {
  const [tags, setTags] = useState([...TagList]);
  useEffect(()=>{
    setTags(TagList);
    console.log(TagList);
  }, [TagList])
  return (
    <div className="h-full space-x-1 space-y-">
      {tags.map((tag)=><TagPill key={tag} title={tag} onDelete={onDelete}/>)}
    </div>
  )
}

export default TagList;
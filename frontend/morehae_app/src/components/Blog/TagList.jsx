import { useEffect } from "react";
import { useState } from "react";
import TagPill from "./TagPill";

const TagList = ({tagList, onDelete}) => {
  const [tags, setTags] = useState(tagList ? [...tagList] : []);
  useEffect(()=>{
    setTags(tagList ? [...tagList] : []);
  }, [tagList])
  return (
    <div className="h-full space-x-1">
      {tags.map((tag)=><TagPill key={tag.tag} title={tag.tag} count={tag.articles_count} id={tag.id ? tag.id : ""} onDelete={onDelete}/>)}
    </div>
  )
}

export default TagList;
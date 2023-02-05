import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useEffect } from "react";

const tags = [
  "인터넷은 어떻게 동작해?",
  "HTTP & HTTPS",
  "도메인",
  "인터넷",
  "CSS",
  "Javascript (기초)",
  "웹페이지를 만들어볼까",
];

const TagCombobox = ({onAddTag, tagList}) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [query, setQuery] = useState("");

  const filteredTag =
    query === ""
      ? tags
      : tags.filter((tag) => {
          return tag.toLowerCase().includes(query.toLowerCase());
        });

  const handleOnKeyDown = (e) => {
    // 현재 선택된 Tag가 Tag 목록에 없는데(사용자 지정 태그인데) 현재 입력된 값과 선택된 태그값이 다른경우
    //  => 선택된 태그 값을 초기화 시킴
    if (!tags.includes(selectedTag) && query !== selectedTag){
      setSelectedTag("");
      return;
    }
    // Tag가 선택된 상태에서 Enter 입력시 Tag 추가.
    if (e.key === "Enter" && selectedTag !== "") {
      console.log(selectedTag);
      console.log(tagList);
      if(tagList.length >= 10){
        return;
      }
      onAddTag((prevTagList)=>{
        let newTagList = [...prevTagList];
        if(!prevTagList.find(tag => tag.tag === selectedTag)){
          newTagList.push({ tag: selectedTag, articles_count: 0});
        }
        console.log(newTagList);
        return newTagList;
      })
      setSelectedTag("");
    }
  };

  return (
    <Combobox value={selectedTag} onChange={setSelectedTag}>
      <Combobox.Input
        className={"px-3 py-2 bg-white text-md border border-slate-300 rounded-md shadow-sm placeholder-slate-40 w-full text-black"}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="태그를 입력해주세요"
        onKeyDown={handleOnKeyDown}
      />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className={
          "absolute bg-white rounded-md text-sm border shadow-sm p-2 z-10"
        }
      >
        <Combobox.Options className={""}>
          {query.length > 0 && !tags.includes(query) && (
            <Combobox.Option key={query} value={query} className={({active})=>`${active ? "text-white bg-blue-500" : ""}`}>
              "{query}" 추가하기
            </Combobox.Option>
          )}
          {filteredTag.map((tag) => (
            <Combobox.Option key={tag} value={tag} className={({active})=>`${active ? "text-white bg-blue-500" : "text-black"}`}>
              {/* {({selected, active}) => {
                <span className={`${selected ? "text-white bg-blue-500" : ""}`}>{tag}</span>
              }} */}
              {tag}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
      <span className="text-sm">{tagList.length}/10</span>
    </Combobox>
  );
};

export default TagCombobox;

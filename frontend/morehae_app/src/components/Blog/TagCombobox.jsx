import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useEffect } from "react";
import HttpWithURL from "@/utils/http"

const TagCombobox = ({onAddTag, tagList}) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
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

  // 서버에서 노드 이름들 불러와서 태그 목록에 할당하는 작업.
  useEffect(()=>{
    const getWholeTagList = async () => {
      let preparedTags = [];
      const getTagList = async (id) => {
        const response = await HttpWithURL(
          process.env.REACT_APP_ROADMAP_URL
        ).get(`track/${id}`);
        response.data.nodesData.map((n)=>{
          preparedTags.push(...n.childs.map((c)=>c.title));
        })
      };
      for (let i = 1; i <= 3; i++) {
        await getTagList(i);
      }
      setTags([...new Set(preparedTags)]);
    };
    getWholeTagList();
  }, [])

  return (
    <Combobox value={selectedTag} onChange={setSelectedTag}>
      <Combobox.Input
        className={"px-3 py-2 text-md rounded-md shadow-sm placeholder-slate-40 w-full bg-slate-800"}
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
        <Combobox.Options className={"max-h-24 overflow-y-scroll"}>
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

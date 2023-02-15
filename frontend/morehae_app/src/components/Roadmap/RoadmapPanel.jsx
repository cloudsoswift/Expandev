import { Disclosure, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Panel } from "reactflow";
import HttpWithURL from "@/utils/http";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsBookmarkStar, BsCaretDownSquare, BsStars } from "react-icons/bs";
import { TbBookmarks, TbBookmarksOff } from "react-icons/tb";
import { GiMoonOrbit, GiStarSwirl } from "react-icons/gi";
import { HiStar } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

function isEmpty(obj) {
  return obj instanceof Object && Object.keys(obj).length === 0;
}

const RoadmapPanel = ({
  onClickNodeButton,
  onSituationChange,
  onTrackChange,
  nodesDataList,
}) => {
  const [trackList, setTrackList] = useState([]);
  const [track, setTrack] = useState(null);
  const [situationList, setSituationList] = useState([]);
  const [situation, setSituation] = useState(null);
  const [subNodeList, setSubNodeList] = useState([]);
  const [isSituationLoading, setSituationLoading] = useState(false);
  const [isSubNodeLoading, setSubNodeLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);

  const userInfo = useSelector((state) => state.user.user);
  // console.log(userInfo);
  // const getSituationList = () => {
  //   for(let i = 1 ; i<=3; i+=1){
  //     HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
  //       .get(`track/${i}`)
  //       .then((response) => {
  //         console.log(response);
  //         setTrackInfo((prevTracks)=>prevTracks ? [...prevTracks, response.data] : [response.data]);
  //         setSituationList((prevSituations)=>prevSituations ? [...prevSituations, response.data.nodesData] : [response.data.nodesData]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  const getSituationList = () => {
    setSituationLoading(true);
    setSituationList(track.nodesData);
    setSituationLoading(false);
  };
  const getSubNodes = () => {
    setSubNodeLoading(true);
    setSubNodeList(situation.childs);
    setSubNodeLoading(false);
  };
  const handleNodeButton = (e) => {
    // console.log(e.target.id);
    onClickNodeButton(e.target.id);
  };
  const handleToggleOverlay = () => {
    setIsShown((prveState) => !prveState);
  };
  // 로드맵 즐겨찾기
  const handleTrackFavorite = (e) => {
    if(!userInfo?.id){
      alert("로그인이 필요한 기능입니다.");
      return
    }
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
    .post(`track/${e.target.id}/favorite`, {}, {
      withCredentials: true,
    })
    .then((response)=>{
      if(response.status === 201){
        console.log(trackList);
        setTrackList(trackList.map((t)=>{
          return {
            ...t,
            ...(t.id.toString() === e.target.id && {favorites: t.favorites.includes(userInfo.id) ? t.favorites.filter((f)=>f !== userInfo.id) : [ ...t.favorites, userInfo.id]})
          }
        }))
      }
    })
  };
  useEffect(() => {
    // getSituationList();
    console.log(nodesDataList);
    setTrackList(
      nodesDataList.map((track, index) => {
        return { ...track, id: index + 1 };
      })
    );
  }, [nodesDataList]);

  useEffect(() => {
    console.log(subNodeList, "subNodeList");
    console.log(situationList, "situationList");
    console.log(situation, "situation");
  }, [subNodeList]);

  useEffect(() => {
    if (situation === null) {
      return;
    }
    onSituationChange(situation);
    getSubNodes();
  }, [situation]);

  useEffect(() => {
    if (track === null) {
      return;
    }
    // onTrackChange(track);
    getSituationList();
  }, [track]);
  return (
    <Panel
      position="top-left"
      className={isShown ? "h-[calc(100%)] w-1/4 ml-0 mt-0" : ""}
      style={{ minWidth: "280px"}}
    >
      {!isShown && (
        <div>
          <button
            onClick={handleToggleOverlay}
            className="border p-2 text-2xl rounded-md"
          >
            <TbLayoutSidebarLeftExpand />
          </button>
        </div>
      )}
      {(
        <Transition
          show={isShown}
          enter="transition duration-500 ease-in-out"
          enterFrom="transition -translate-x-full opacity-0"
          enterTo="transition translate-x-0 opacity-100"
          leave="transition duration-500 ease-in-out"
          leaveFrom="transition translate-x-0 opacity-100"
          leaveTo="transition -translate-x-full opacity-0"
          className="bg-black/70 h-full w-full p-4 shadow-sm"
        >
          <div className="flex justify-end mb-4">
            <button onClick={handleToggleOverlay}>
              <ImCross className="text-white" />
            </button>
          </div>
          <div className="h-[calc(100%-32px)] overflow-y-auto customscrollbar">
            {!trackList && (
              <div className="text-md text-center font-bold text-white">
                현재 서버와 통신할 수 없습니다.
              </div>
            )}
            {trackList.map((t, index) => (
              <Disclosure key={t.title}>
                {({ open }) => (
                  <div className="items-center">
                    {/* <button
                      className="text-white border p-1 rounded-md absolute ml-2 mt-2"
                      id={r.id}
                      onClick={handleTrackFavorite}
                    >
                      <BsBookmarkStar className="pointer-events-none"/>
                    </button> */}
                    <div className="grid grid-cols-12 bg-gray-900 p-2">

                    <Disclosure.Button
                      className={`grid grid-cols-12 col-span-11 rounded-sm items-center space-x-1 text-green-500 w-full`}
                      onClick={() => {
                        setTrack(t);
                      }}
                    >
                      <FaAngleRight
                        className={`justify-self-end inline ${
                          open ? "rotate-90" : ""
                        }`}
                      />
                      <GiStarSwirl className={open ? "" : "grayscale"} />
                      <span className="col-span-10 text-left">{t.title}</span>
                    </Disclosure.Button>
                    <button id={t.id} onClick={handleTrackFavorite} className="text-center">
                      {t.favorites.includes(userInfo.id) ? <TbBookmarksOff className="pointer-events-none w-full h-full"/> : <TbBookmarks className="pointer-events-none w-full h-full"/>}
                    </button>
                    </div>
                    <Transition
                      enter="transition duration-100 ease-out"s
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="w-full">
                        {({ close }) =>
                          t.id === track.id ? (
                            isSituationLoading ? (
                              <div className="flex justify-center items-center text-white">
                                로딩중...{" "}
                                <AiOutlineLoading className="animate-spin" />
                              </div>
                            ) : (
                              situationList.map((s) => (
                                <Disclosure key={s.id}>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        className="grid grid-cols-12 p-2 items-center space-x-1 text-green-500 w-full"
                                        id={s.id}
                                        onClick={() => {
                                          setSituation(s);
                                        }}
                                      >
                                        <div className="col-span-1" />
                                        <FaAngleRight
                                          className={`justify-self-end place-self-center inline ${
                                            open ? "rotate-90" : ""
                                          }`}
                                        />
                                        <GiMoonOrbit
                                          className={open ? "" : "grayscale"}
                                        />
                                        <span className="col-span-9 text-xs text-left">
                                          {s.title}
                                        </span>
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        {({ close }) =>
                                          s.id === situation.id ? (
                                            isSubNodeLoading ? (
                                              <div className="flex justify-center items-center text-white">
                                                로딩중...{" "}
                                                <AiOutlineLoading className="animate-spin" />
                                              </div>
                                            ) : (
                                              subNodeList.map((sn) => (
                                                <div className="grid grid-cols-12 p-1 items-center">
                                                  <div className="col-span-3"></div>
                                                  <BsStars />
                                                  <button
                                                    className="text-white col-span-8 text-left text-sm"
                                                    id={sn.id}
                                                    onClick={handleNodeButton}
                                                  >
                                                    {sn.title}
                                                  </button>
                                                </div>
                                              ))
                                            )
                                          ) : (
                                            close()
                                          )
                                        }
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              ))
                            )
                          ) : (
                            close()
                          )
                        }
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </Transition>
      )}
    </Panel>
  );
};

export default RoadmapPanel;

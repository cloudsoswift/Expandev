import { Disclosure, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Panel } from "reactflow";
import HttpWithURL from "@/utils/http";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsBookmarkStar, BsCaretDownSquare } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

function isEmpty(obj) {
  return obj instanceof Object && Object.keys(obj).length === 0;
}

const RoadmapPanel = ({ onClickNodeButton, onSituationChange }) => {
  const [trackInfo, setTrackInfo] = useState({});
  const [situation, setSituation] = useState(null);
  const [situationList, setSituationList] = useState([]);
  const [subNodeList, setSubNodeList] = useState([]);
  const [isSituationLoading, setSituationLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);

  const userInfo = useSelector(state=>state.user.user);

  const getSituationList = () => {
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get("track/1")
      .then((response) => {
        console.log(response);
        setTrackInfo(response.data);
        setSituationList(response.data.nodesData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSubNodes = () => {
    setSituationLoading(true);
    setSubNodeList(situation.childs);
    setSituationLoading(false);
  };
  const handleNodeButton = (e) => {
    // console.log(e.target.id);
    onClickNodeButton(e.target.id);
  };
  const handleToggleOverlay = () => {
    setIsShown((prveState) => !prveState);
  };
  // 로드맵 즐겨찾기 보류
  // const handleTrackFavorite = (e) => {
  //   HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
  //   .get(`track/${e.target.id}/favorite`)
  //   .then((response)=>{

  //   })
  // };
  useEffect(() => {
    getSituationList();
  }, []);
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
  return (
    <Panel
      position="top-left"
      className={isShown ? "h-[calc(100%-50px)] w-1/4 mb-10" : ""}
      style={{ minWidth: "280px" }}
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
      {isShown && (
        <div className="bg-black text-black h-full w-full rounded-3xl p-4 border border-white shadow-sm">
          <div className="flex justify-end mb-4">
            <button onClick={handleToggleOverlay}>
              <ImCross className="text-white" />
            </button>
          </div>
          <div className="h-[calc(100%-32px)] overflow-y-scroll">
            {isEmpty(trackInfo) && (
              <div className="text-3xl font-bold">
                현재 서버와 통신할 수 없습니다.
              </div>
            )}
            {!isEmpty(trackInfo) && (
              <div className="text-white text-center py-2">{trackInfo?.title}</div>
            )}
            {situationList.map((s) => (
              <Disclosure key={s.id}>
                {({ open }) => (
                  <div className="items-center">
                    {/* <button
                      className="text-white border p-1 rounded-md absolute ml-2 mt-2"
                      id={r.id}
                      onClick={handleTrackFavorite}
                    >
                      <BsBookmarkStar className="pointer-events-none"/>
                    </button> */}
                    <Disclosure.Button
                      className="grid grid-cols-10 rounded-t-xl justify-center items-center p-2 border border-white bg-black text-green-500 w-full"
                      onClick={() => {
                        setSituation(s);
                      }}
                    >
                      <span className="col-span-9">{s.title}</span>
                      <BsCaretDownSquare
                        className={`justify-self-end inline ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="border border-t-0 border-white w-full">
                        {({ close }) =>
                          s.id === situation.id ? (
                            isSituationLoading ? (
                              <div className="flex justify-center items-center text-white">
                                로딩중...{" "}
                                <AiOutlineLoading className="animate-spin" />
                              </div>
                            ) : (
                              subNodeList.map((sn) => (
                                <div
                                  key={sn.id}
                                  className="text-center border-b"
                                >
                                  <button
                                    id={sn.id}
                                    onClick={handleNodeButton}
                                    className="text-green-500 font-bold"
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
                    </Transition>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
};

export default RoadmapPanel;

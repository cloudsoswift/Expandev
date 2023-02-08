import { Disclosure, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { BsCaretDownSquare } from "react-icons/bs";
import { Panel } from "reactflow";
import HttpWithURL from "@/utils/http";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

const RoadmapPanel = ({ onClickNodeButton, onRoleChange }) => {
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState(null);
  const [situationList, setSituationList] = useState([]);
  const [situation, setSituation] = useState({});
  const [isSituationLoading, setSituationLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const getRoleList = () => {
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get("roles")
      .then((response) => {
        console.log(response);
        setRoleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSituation = () => {
    setSituationLoading(true);
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`track/${role.id}`)
      .then((response) => {
        console.log(response);
        setSituationList(response.data.nodesData);
        setSituationLoading(false);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  const handleNodeButton = (e) => {
    // console.log(e.target.id);
    onClickNodeButton(e.target.id);
  };
  const handleToggleOverlay = () => {
    setIsShown(prveState=>!prveState);
  };
  useEffect(() => {
    getRoleList();
  }, []);

  useEffect(() => {
    if (role === null) {
      return;
    }
    onRoleChange(role);
    getSituation();
  }, [role]);
  return (
    <Panel
      position="top-left"
      className={isShown ? "h-full -bottom-10 w-1/4 mb-10" : ""}
      style={{ minWidth: "280px" }}
    >
      {!isShown && (
        <div>
          <button onClick={handleToggleOverlay} className="border p-2 text-2xl rounded-md">
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
          <div>
            {roleList === [] && (
              <div className="text-3xl font-bold">
                현재 서버와 통신할 수 없습니다.
              </div>
            )}
            {roleList.map((r) => (
              <Disclosure key={r.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="grid grid-cols-10 rounded-t-xl justify-center border items-center p-2 border border-white bg-black text-green-500 w-full"
                      onClick={() => {
                        setRole(r);
                      }}
                    >
                      <span className="col-span-9">{r.content}</span>
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
                          r.id === role.id ? (
                            isSituationLoading ? (
                              <div className="flex justify-center items-center text-white">
                                로딩중...{" "}
                                <AiOutlineLoading className="animate-spin" />
                              </div>
                            ) : (
                              situationList.map((s) => (
                                <div
                                  key={s.id}
                                  className="text-center border-b"
                                >
                                  <button
                                    id={s.id}
                                    onClick={handleNodeButton}
                                    className="text-green-500 font-bold"
                                  >
                                    {s.title}
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
                  </>
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

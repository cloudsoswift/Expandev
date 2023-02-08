import { Disclosure, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { BsCaretDownSquare } from "react-icons/bs";
import { Panel } from "reactflow";
import HttpWithURL from "@/utils/http";
import { useState } from "react";

const RoadmapPanel = ({onClickNodeButton, onRoleChange}) => {
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState(null);
  const [situationList, setSituationList] = useState([]);
  const [situation, setSituation] = useState({});
  const [isSituationLoading, setSituationLoading] = useState(false);
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
    HttpWithURL(process.env.REACT_APP_ROADMAP_URL)
      .get(`track/${role.id}`)
      .then((response) => {
        console.log(response);
        setSituationList(response.data.nodesData);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  const handleNodeButton = (e) => {
    // console.log(e.target.id);
    onClickNodeButton(e.target.id);
  }
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
    <Panel position="top-left" className="h-full w-1/4 mb-10 shadow-sm">
      <div className="bg-white text-black h-full w-full rounded-3xl p-2">
        하이
        {roleList.map((r) => (
          <Disclosure key={r.id}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className="flex justify-between border items-center p-2 bg-black text-white w-full"
                  onClick={() => {
                    setRole(r);
                  }}
                >
                  <span>{r.content}</span>
                  <BsCaretDownSquare
                    className={`${open ? "rotate-180" : ""}`}
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
                  <Disclosure.Panel className="text-gray-500 bg-blue-50 w-full">
                    {({ close }) =>
                      r.id === role.id
                        ? situationList.map((s) => (
                            <div key={s.id}>
                              <button id={s.id} onClick={handleNodeButton}>{s.title}</button>
                            </div>
                          ))
                        : close()
                    }
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </Panel>
  );
};

export default RoadmapPanel;

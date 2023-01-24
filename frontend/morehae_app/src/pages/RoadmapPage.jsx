import Roadmap from "@/components/Roadmap/Roadmap";
// import nodesDataJSON from "./nodesDataJSON.json"
import Dropdown from "@/components/Dropdown/Dropdown";
import axios from "axios";

import { useState, useRef, useEffect } from "react";

const RoadmapPage = ({ handleClickButton }) => {
  const DropdownRefA = useRef(null);
  const DropdownRefB = useRef(null);
  const [isOpenRoleA, setIsOpenRoleA] = useState(false);
  const [isOpenRoleB, setIsOpenRoleB] = useState(false);
  const [selectedRole, setSelectedRole] = useState(0);
  const [roleList, setRoleList] = useState([
    { id: 0, content: "내용이 없습니다" },
  ]);
  const [nodesDataJSON, setNodesDataJSON] = useState({
    id: 1,
    nodesData: [],
  });
  // const [selectedSentence, setSelectedSentence] = useState(0);

  useEffect(() => {
    let handler = (e) => {
      if (!DropdownRefA.current.contains(e.target)) {
        setIsOpenRoleA(false);
        if (!DropdownRefB.current.contains(e.target)) {
          setIsOpenRoleB(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);

    //fetch 요청하기
    //https://jsonplaceholder.typicode.com/users
    axios
      .get("https://ssekerapi.site/roadmaps/roles")
      .then((Response) => {
        console.log(Response.data);
        setRoleList(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });

    axios
      .get("https://ssekerapi.site/roadmaps/track/1")
      .then((Response) => {
        setNodesDataJSON(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="bg-blue-100" style={{  "width": "100%", "overflow-x": "hidden", "overflow-y": "hidden"}}>
      <div className="flex justify-center">
        <div ref={DropdownRefA}>
          <Dropdown
            isOpenRole={isOpenRoleA}
            setIsOpenRole={setIsOpenRoleA}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            roleList={roleList}
          />
        </div>
        <div ref={DropdownRefB}>
          <Dropdown isOpenRole={isOpenRoleB} setIsOpenRole={setIsOpenRoleB} />
        </div>
      </div>
      {selectedRole}
      <Roadmap
        nodesDataJSON={nodesDataJSON}
        handleClickButton={handleClickButton}
      />
    </div>
  );
};

export default RoadmapPage;

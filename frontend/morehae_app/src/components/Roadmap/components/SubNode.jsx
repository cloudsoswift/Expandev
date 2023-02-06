const SubNode = ({subNodeData, xpos, yposObj, dy, handleClickButton}) => {
  const subWidth = 80;
  const subHeight = 20;
  const subFill = "lightgray"

  function clickHandler() {
    console.log(handleClickButton);
    console.log("서브 노드 클릭됨:", subNodeData.title);
    handleClickButton(subNodeData.id);
  }

  return (
    <g className="sub-node" onClick={clickHandler}>
      <rect
        x = {xpos}
        y = {yposObj.ypos-dy}
        width = {subWidth}
        height = {subHeight}
        fill = {subFill}
        rx = "5"
        ry = "5"
      />
      <text
        x = {xpos+subWidth/2}
        y = {yposObj.ypos-dy + subHeight/2}
        fontSize="5"
        textAnchor="middle"
        alignmentBaseline="central"
      > {subNodeData.title} </text>
    </g>
  )
}

export default SubNode;
const Julgi = ({roadmapWidth, yposObj}) => {
  const julgiWidth = 10;
  const julgiHeight = 70;
  const julgiFill = "white"
  const rect =
    <rect
      x = {roadmapWidth / 2 - julgiWidth/2}
      y = {yposObj.ypos}
      width = {julgiWidth}
      height = {julgiHeight}
      fill = {julgiFill}
      rx = "5"
      ry = "5"
      className = "julgi"
    />
  yposObj.setYpos(julgiHeight + 10);
  return (
    rect
  )
}

export default Julgi;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollbarControl = () => {

  // index js에 존재
  // router가 변경될때마다 auto속성을 달아주어 랜덤으로 스크롤바가 노출되는 것을 해결
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = "auto"
  }, [pathname]);

  return null;
};

export default ScrollbarControl;

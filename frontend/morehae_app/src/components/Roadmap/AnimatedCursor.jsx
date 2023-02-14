import React, { useState, useRef, useEffect, useCallback } from "react";
// import cursorBackground from '@/img/cursor.png'

// 이벤트 등록 및 제거 관련 함수
function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef();

  
  // 최근 ref에 handler가 바뀔때마다 handler등록
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);

    // 입력되는 이벤트 등록
    element.addEventListener(eventName, eventListener);

    return () => {
      // 마지막에 이벤트 제거
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function AnimatedCursor({
  // color = "0, 250, 0, .15",
  // outerAlpha = 0.4,
  innerSize = 10,
  // outerSize = 8,
  // outerScale = 5,
  // 원 크기 배수
  innerScale = 5.5,
  tempImage = "https://www.pngkit.com/png/full/8-87967_astronaut-side-png.png"
}) {
  const cursorOuterRef = useRef();
  const cursorInnerRef = useRef();
  // const requestRef = useRef();
  // const previousTimeRef = useRef();
  

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  let endX = useRef(0);
  let endY = useRef(0);
 
  // 마우스가 움직일 때
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    // 커스텀 커서 중간 위치 변경
    cursorInnerRef.current.style.top = clientY - 10 + "px";
    cursorInnerRef.current.style.left = clientX - 10 + "px";
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  // 따라오는 커서
  // const animateOuterCursor = useCallback(
  //   (time) => {
  //     if (previousTimeRef.current !== undefined) {
  //       coords.x += (endX.current - coords.x) / 8;
  //       coords.y += (endY.current - coords.y) / 8;
  //       cursorOuterRef.current.style.top = coords.y + "px";
  //       cursorOuterRef.current.style.left = coords.x + "px";
  //     }
  //     previousTimeRef.current = time;
  //     requestRef.current = requestAnimationFrame(animateOuterCursor);
  //   },
  //   [requestRef] // eslint-disable-line
  // );

  // useEffect(
  //   () => (requestRef.current = requestAnimationFrame(animateOuterCursor)),
  //   [animateOuterCursor]
  // );

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mousedown", onMouseDown, document);
  useEventListener("mouseup", onMouseUp, document);
  useEventListener("mouseenter", onMouseEnter, document);
  useEventListener("mouseleave", onMouseLeave, document);

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`;

      // cursorOuterRef.current.style.transform = `scale(${outerScale})`;
    } else {
      cursorInnerRef.current.style.transform = "scale(1) ";
      // cursorOuterRef.current.style.transform = "scale(1)";
    }
  }, [innerScale, isActive]);
  // }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (isActiveClickable) {
      // 클릭했을 때 변하는 값, 추후 회전을 고려해보자
      cursorInnerRef.current.style.transform = `scale(${
        innerScale * 0
      })`;
      // cursorInnerRef.current.style.transform = `scale(${
      //   innerScale * 0.9
      // }) rotate(0.25turn)`;
      // cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
    }
  }, [innerScale, isActiveClickable]);
  // }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.opacity = 1;
      // cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      // cursorOuterRef.current.style.opacity = 0;
    }
  }, [isActive]);

  useEffect(() => {
    // 반응하는 요소
    const clickables = document.querySelectorAll(
      // 'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
      //  서브노드에 id 이름 따로 지정해둠
      "#subscursor"
    );
    
    clickables.forEach((el) => {
      // 기존 커서를 안보이게
      el.style.cursor = "none";

      el.addEventListener("mouseover", () => {
        setIsActive(true);
      });
      el.addEventListener("click", () => {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener("mousedown", () => {
        setIsActiveClickable(true); 
      });
      el.addEventListener("mouseup", () => {
        setIsActive(true);
      });
      el.addEventListener("mouseout", () => {
        setIsActive(false);
        setIsActiveClickable(false);
      });
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseover", () => {
          setIsActive(true);
        });
        el.removeEventListener("click", () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener("mousedown", () => {
          setIsActiveClickable(true);
        });
        el.removeEventListener("mouseup", () => {
          setIsActive(true);
        });
        el.removeEventListener("mouseout", () => {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      });
    };
  }, [isActive]);

  const styles = {
    // cursor: {
    //   zIndex: 999,
    //   position: "fixed",
    //   // opacity: 50,
    //   border: "1px solid rgba(0, 255, 0, 0)",
    //   pointerEvents: "none",
    //   transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    // },

    // shadow 신경쓰기(빛나는 효과)
    cursorInner: {
      position: "fixed",
      // borderRadius: "45%",
      width: 8,
      height: 9,
      pointerEvents: "none",
      // border: "1px solid rgba(1,254, 59, .5)",
      // backgroundColor: `rgba(74, 222, 128, .3)`,
      backgroundImage: `url(${tempImage})`,
      backgroundSize:"cover",
      transition: "transform 0.25s ease-in-out",
      // boxShadow: "0px 0px 1px 0.5px rgba(0, 200, 0, 0.30)",
      // opacity 왜 안되는거지???
      opacity: 0,
    },
    spaceship: {
      position: "fixed",
      // borderRadius: "45%",
      width: 8,
      height: 9,
      pointerEvents: "none",
      // border: "1px solid rgba(1,254, 59, .5)",
      // backgroundColor: `rgba(74, 222, 128, .3)`,
      backgroundImage: `url(${tempImage})`,
      backgroundSize:"cover",
      transition: "transform 0.25s ease-in-out",
      // boxShadow: "0px 0px 1px 0.5px rgba(0, 200, 0, 0.30)",
      // opacity 왜 안되는거지???
      opacity: 0,
    },
    // crossCursor: {
    //   backgroundColor: "rgba(255, 0, 0, 1)",
    //   height: 100,
    //   position: "relative",
    //   width: 20,
    //   '&::after': {
    //     backgroundColor: "rgba(255, 0, 0, 1)",
    //     content: "",
    //     height: 20,
    //     left: -40,
    //     position: "absolute",
    //     top: 40,
    //     width: 100,
    //   }
    // },
    // cursorOuter: {
    //   position: "fixed",
    //   borderRadius: "50%",
    //   pointerEvents: "none",
    //   width: outerSize,
    //   height: outerSize,
    //   backgroundColor: `rgba(${color}, ${outerAlpha})`,
    //   transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    // },
  };

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  );
}

export default AnimatedCursor;

// function App() {
//   return (
//     <div className="App">
//       <AnimatedCursor/>
//       <section>
//         <h1>Animated Cursor <br/>React Component</h1>
//         <hr/>
//         <p>An animated cursor component made as a <a>Functional Component</a>, using <a>React hooks</a> like <a>useEffect</a> to handle event listeners, local state, an  <a>RequestAnimationFrame</a> management.</p>
//         <p>Hover over these <a>links</a> and see how that animated cursor does it's thing. Kinda nifty, right? Not right for most things, but a nice move for more interactive-type projects. Here's another <a href="">link to nowhere.</a></p>
//         <p>Play with the <a>css variables</a> to influence the cursor, cursor outline size, and amount of scale on target hover. I suppose those could all be <a>props</a> with some. Click in the margin to check click animation.</p>
//       <p>There's probably a better way to manage these kind of events, but this was the best I could come up with. Recently started mucking more with React cause I'm down with the simplicity of Functional Components and Hooks. And if you read the docs, the future ain't class components. So, best get on them functions.</p>
//       </section>
//     </div>
//   );
// }

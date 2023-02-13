import React from "react";
import { createPortal } from "react-dom";

// modal 형식만 나타내는 component
const Modal = ({ showModal, setShowModal, children }) => {

  document.body.style.overflow = "hidden";
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      setShowModal(() => false);
      document.body.style.overflow = "scroll";
    }
  };


  return createPortal(
    // modal blur
    <div
      className={`fixed inset-0 flex justify-end items-center z-20 ease-in-out duration-500 ${
        showModal
          ? ""
          : "translate-x-full"
      }`}
      // className={`fixed inset-0 bg-black bg-opacity-25 flex justify-end items-center z-20 ease-in-out duration-500 ${
      //   showModal
      //     ? "backdrop-blur-sm"
      //     : "translate-x-full"
      // }`}
      id="wrapper"
      onClick={handleClose}
    >
      {/* modal bg */}
      {/* scroll을 지정할 땐 max값이 필수 */}
      <div
        className={`scroll-smooth max-h-screen sm:w-[600px] right-0 top-0 customscrollbar ease-in-out duration-500 ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className=" bg-[rgb(32,37,42)] ">{children}</div>
      </div>
    </div>,
    // 포탈 분리
    document.getElementById("modal")
  );
};

export default Modal;

import React from "react";
import { createPortal } from "react-dom";

// modal 형식만 나타내는 component
const Modal = ({ isVisible, onClose, children }) => {


  if (!isVisible) return null;

  document.body.style.overflow = "hidden";
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
      document.body.style.overflow = "scroll";
    }
  };

  return createPortal(
    // modal blur
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-end items-center"
      id="wrapper"
      onClick={handleClose}
    >
      {/* modal bg */}
      {/* scroll을 지정할 땐 max값이 필수 */}
      <div className="overflow-y-auto scroll-smooth  max-h-screen sm:w-[600px] right-0 top-0">
        <div className=" bg-white p-2 ">{children}</div>
      </div>
    </div>,
    // 포탈 분리
    document.getElementById("modal")
  );
};

export default Modal;

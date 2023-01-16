import React from "react";

// modal 형태만
const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    // modal blur
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-end items-center"
      id="wrapper"
      onClick={handleClose}
    >
      {/* modal bg */}
      {/* scroll을 지정할 땐 max값이 필수 */}
      <div className="overflow-y-auto max-h-screen md:w-[600px] right-0 top-0">
        <div className=" bg-white p-2 ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

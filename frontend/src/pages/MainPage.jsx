import React, { useState } from "react";

import Modal from "../components/Modal";
import WhatWhy from "../components/WhatWhy";
import Links from "../components/Links";
import Review from "../components/Review";





const MainPage = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className="p-10 ">
        <h1 className="text-3xl mb-5">Main Page</h1>
        <button
          id={1}
          className="cursor-pointer bg-blue-600 hover:bg-blue-800 focus:outline-none px-5 py-2 rounded-md font-medium text-sm text-white mr-5"
          onClick={() => setShowModal(true)}
        >
          Node1
        </button>
        <button
          id={2}
          className="cursor-pointer bg-blue-600 hover:bg-blue-800 focus:outline-none px-5 py-2 rounded-md font-medium text-sm text-white mr-5"
          onClick={() => setShowModal(true)}
        >
          Node2
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className=" flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900 mb-5">
                modal title
              </h3>
              <input className="w-5 h-5 ml-2" type="checkbox" />
            </div>
            <div className="justify-items-end">
              <button className=" bg-blue-200 px-3 py-1 rounded text-xs">
                POST
              </button>
            </div>
            <WhatWhy />
            <Links />
            <Review />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;

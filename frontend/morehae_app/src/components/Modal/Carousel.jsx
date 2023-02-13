import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Carousel = ({ reqData }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(reqData?.interview);
  

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    let slide = document.getElementById("slide");
    let slideWidth = slide.clientWidth;
    slider.scrollLeft -= slideWidth * 3;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    let slide = document.getElementById("slide");
    let slideWidth = slide.clientWidth;
    slider.scrollLeft += slideWidth * 3;
  };

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = (id) => {
    console.log(id);
    // 해당 아이디만 오픈.....
    if (id) {
      let selectedData = reqData.interview.filter((item) => item.id === id);
      setModalData(selectedData);
      
    }
    setIsOpen(() => !isOpen);
  };
  return (
    <>
      <div className="relative flex items-center">
        <div
          onClick={slideLeft}
          className="text-xl cursor-pointer p-0.5 text-[rgb(161,173,185)] hover:text-green-400 "
        >
          {"<"}
        </div>
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth "
        >
          {reqData?.interview?.map((item, slideIdx) => (
            <div
              onClick={() => openModal(item?.id)}
              id="slide"
              key={slideIdx}
              className="group w-[162px] h-[162px] rounded-lg inline-block whitespace-normal border p-2 mx-[0.25rem] cursor-pointer  ease-in-out duration-300 border-[rgb(71,79,88)] hover:border-green-400 hover:text-white"
            >
              <div>
                <p className="pr-3 w-[150px] h-[120px] whitespace-normal text-[rgb(161,173,185)] duration-300  text-sm text-ellipsis line-clamp-6 border-[rgb(131,132,139)] hover:text-white">
                  {item.content}
                </p>
                <div className="h-[5px]"></div>
                <div className="h-[35px] flex justify-end">
                  <div className="text-xs text-[rgb(161,173,185)] hover:text-white">
                    {item.interviewee}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={slideRight}
          className="text-xl  cursor-pointer p-1 text-[rgb(161,173,185)] hover:text-green-400"
        >
          {">"}
        </div>
      </div>
      {/* InterviewModal */}
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {/* 본론 */}
                  <Dialog.Panel className=" w-[600px] h-[600px] overflow-y-scroll customscrollbar rounded-lg border-2 border-mbc bg-[rgb(36,41,47)] p-6 text-left align-middle shadow-xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {modalData[0].interviewee}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-[rgb(161,173,185)]">
                        {modalData[0].content}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md bg-[rgb(42,42,50)] hover:bg-[rgb(50,50,50)] cursor-pointer text-[rgb(131,132,139)] text-xs hover:text-green-500 drop-shadow-md border-2 hover:border-green-500 border-[rgb(131,132,139)] ease-in-out duration-300"
                        onClick={closeModal}
                      >
                        확인
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};

export default Carousel;

import React from "react";

interface IProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  title?: React.ReactNode;
  textOk?: React.ReactNode;
  textCancel?: React.ReactNode;
  footer?: boolean;
}

export default function Modal({
  showModal,
  children,
  textOk,
  setShowModal,
  title,
  textCancel,
  footer = true,
}: IProps) {
  return (
    <>
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              {/*content*/}

              <div className="border-0 bg-gray-900 text-white px-[1rem] py-[0.5rem] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div
                  className={"flex justify-between gap-[1rem] items-center  "}
                >
                  <div>{title}</div>
                  <div
                    onClick={() => setShowModal(false)}
                    className={
                      "justify-self-end cursor-pointer  font-black text-2xl "
                    }
                  >
                    X
                  </div>
                </div>
                {/*body*/}
                <div className="relative flex-auto">{children}</div>
                {/*footer*/}
                {footer && (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      {textCancel}
                      {!textCancel && "Cancel"}
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      {textOk}
                      {!textCancel && "Save"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

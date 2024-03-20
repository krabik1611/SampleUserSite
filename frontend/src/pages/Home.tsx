import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { UserContextType } from "../types/user";
import Modal from "../component/Modal";
import { ResetForm } from "../component/ResetForm";

export const Home = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [open, setOpen] = useState(false);




  return (
    <>
      <Modal
        title={<div className={"text-xl font-semibold"}>Reset Password</div>}
        footer={false}
        showModal={open}
        setShowModal={setOpen}
      >
        <ResetForm
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </Modal>

      <div className={"h-screen px-[1.5rem] py-[2rem]"}>
        <div className={"text-xl mb-[1rem]"}>Profile</div>
        <div>
          {user &&
            Object.keys(user).map((key, i) => {
              return (
                <div className={"grid grid-cols-2"} key={i}>
                  <div className={"font-bold"}>{key}</div>
                  <div>{user[key]}</div>
                </div>
              );
            })}
        </div>
        <div className={"flex gap-[1rem]"}>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="mt-[2rem] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("key");
              window.location.reload();
            }}
            className="mt-[2rem] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

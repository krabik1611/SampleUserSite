import {useState} from "react";
import {api} from "../index";

interface IProps {
  onOk?: () => void;
  onCancel?: () => void;
}

export const ResetForm = (props: IProps) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const cleanup = () => {
    setError("");
    setPassword("");
    setPasswordConfirm("");
  };




  const resetPassword = () => {
    api
      .resetPassword(password)
      .then(() => {
        cleanup()
        props.onOk && props.onOk();
      })
      .catch((err) => {
        console.log(err);
        setError(err.toString);
      });
  };

  return (
    <div>
      <form
        className={"bg-gray-900 p-6 flex flex-col gap-[1rem]"}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resetPassword();
        }}
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.currentTarget.value);
            }}
            id="passwordConfirm"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {(password || passwordConfirm) && password !== passwordConfirm && (
          <div className={"text-red-600 font-semibold"}>
            Password doesnt match
          </div>
        )}

        {error && <div className={"text-red-600 font-semibold"}>{error}</div>}

        <button
          disabled={
            !password || !passwordConfirm || password !== passwordConfirm
          }
          type="submit"
          className="w-full disabled:bg-blue-950 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";
import { useAlert } from "../components/Alert";
import supabase from "./api/supabaseClient";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const trigger = useAlert();

  const changePassword = async () => {
    if (newPassword != newPasswordConfirmation) {
      trigger({
        text: "Your password confirmation is different of you new password",
        title: "Your passwords are different",
        type: "Error",
      });
      return;
    }
    const userEmail = router.query.userEmail;

    if (!userEmail) return;
    const users = await supabase.auth.admin.listUsers();
    const singleUser = users.data.users.filter((u) => u.email == userEmail);
    await supabase.auth.admin
      .updateUserById(singleUser[0].id, {
        password: newPassword,
      })
      .then((e) => {
        if (e.data.user) {
          trigger({
            text: "Your password has been changed",
            title: "Your password was successfully changed",
            type: "Success",
          });
          router.push("/login");
        } else {
          trigger({
            text: "An error happened",
            title: "An unexpected error happened... Please, try again",
            type: "Error",
          });
        }
      });
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change your password
              </h1>
              <p className="text-gray-600 text-sm">
                Write your new password below.
              </p>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                changePassword();
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                />
                <label
                  htmlFor="newPasswordConfirmation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat new Password
                </label>
                <input
                  type="password"
                  id="newPasswordConfirmation"
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  changePassword();
                  e.preventDefault();
                }}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

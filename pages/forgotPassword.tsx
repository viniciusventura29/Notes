import { useRouter } from "next/router";
import { useState } from "react";
import { useAlert } from "../components/Alert";
import supabase from "./api/supabaseClient";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const trigger = useAlert();

  const sendRecoveryPasswordEmail = async () => {
    await supabase.auth.resetPasswordForEmail(email);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot your password
              </h1>
              <p className="text-gray-600 text-sm">
                Write your e-mail below and we will send a recovery link.
              </p>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                sendRecoveryPasswordEmail();
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  sendRecoveryPasswordEmail();
                  e.preventDefault();
                }}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send e-mail
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

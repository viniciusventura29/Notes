import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "./login";
import { useAlert } from "../components/Toast";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const trigger = useAlert();

  const register = () => {
    supabase.auth
      .signUp({
        email: email,
        password: password,
        options: { emailRedirectTo: "https://notes.ventura.dev.br" },
      })
      .then((e) => {
        if (e.error) {
          trigger({
            text: e.error.message,
            title: "Login failed",
            type: "Error",
          });
          return;
        }
        trigger({
          text: "You will recieve an e-mail to confirm your user",
          title: "User registered",
          type: "Success",
          duration:10000
        });

        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        }, 15000);
      });
    console.log("oi");
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                register();
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  register();
                  e.preventDefault();
                }}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Just have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login
                </a>
              </p>
              <p>{showMessage? "We send a link in your e-mail to verify your account":""}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import PendingButton from "../components/button/Pending";
import SubmitFull from "../components/button/Submit";
import { login as loginSlice } from "../store/authSlice";
import { showNotif } from "../store/notifSlice";

export default function Login() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [pending, setPending] = useState(null);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });

      console.log(res);

      if (!res.error) {
        router.replace("/dashbord");
        // dispatch(loginSlice(res.user));
      }
      // const response = await await fetch(
      //   `${process.env.REACT_APP_SERVER_URL}/user/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: email.current.value,
      //       password: password.current.value,
      //     }),
      //     headers: {
      //       // "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error.message || "Tidak bisa masuk");
      // }
      // dispatch(loginSlice(result.user));
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="py-16">
      <div className="form-card dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Masuk ke Dashbord
        </h1>
        <form className="mt-6" onSubmit={loginHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              ref={email}
              type="email"
              autoComplete="email"
              required
              className="input-field mt-2"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <Link href="/akunku/lupa-sandi">
                <a className="text-xs text-indigo-600 dark:text-gray-400 hover:underline">
                  Lupa Password?
                </a>
              </Link>
            </div>
            <input
              ref={password}
              required
              type="password"
              autoComplete="current-password"
              className="input-field mt-2"
            />
          </div>

          <div className="mt-6">
            {pending ? <PendingButton /> : <SubmitFull text="Masuk" />}
          </div>
        </form>

        <p className="mt-6 text-sm font-light text-center text-gray-700">
          Belum Punya Akun?{" "}
          <button
            onClick={() => router.push("/daftar")}
            className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
          >
            DAFTAR
          </button>
        </p>
      </div>
    </div>
  );
}

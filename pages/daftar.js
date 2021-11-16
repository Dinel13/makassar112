import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";


import PendingButton from "../components/button/Pending";
import SubmitFull from "../components/button/Submit";
import { login as loginSlice } from "../store/authSlice";
import { showNotif } from "../store/notifSlice";

export default function Login() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const [pending, setPending] = useState(null);
  const router = useRouter();

  const singupHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: name.current.value,
            email: email.current.value,
            password: password.current.value,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message || "Tidak bisa buat akun");
      }
      router.push("/dashbord");
      dispatch(loginSlice(result.user));
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
          Daftar Operator
        </h1>
        <form className="mt-6" onSubmit={singupHandler}>
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
              className="mt-2 input-field"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="userName"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Nama Lengkap
              </label>
            </div>
            <input
              ref={name}
              type="text"
              required
              autoComplete="username"
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
            {pending ? <PendingButton /> : <SubmitFull text="Daftar" />}
          </div>
        </form>

        <p className="mt-6 text-sm font-light text-center text-gray-700">
          Sudah Punya Akun?{" "}
          <button
            onClick={() => router.push("/masuk")}
            className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
          >
            MASUK
          </button>
        </p>
      </div>
    </div>
  );
}

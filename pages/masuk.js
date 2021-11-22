import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import PendingButton from "../components/button/Pending";
import SubmitFull from "../components/button/Submit";
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

      if (res.error) {
        dispatch(
          showNotif({
            status: "Error",
            message: res.error,
            action: null,
          })
        );
      }

      if (res.ok) {
        router.replace("/dashboard");
        // dispatch(loginSlice(res.user));
      }
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
      <div className="form-card dark-card">
        <h1 className="text-3xl font-semibold text-center">
          Masuk ke Dashbord
        </h1>
        <form className="mt-6" onSubmit={loginHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm "
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
                className="block text-sm "
              >
                Password
              </label>
              {/* <Link href="/akunku/lupa-sandi">
                <a className="text-xs text-indigo-600 dark:text-gray-400 hover:underline">
                  Lupa Password?
                </a>
              </Link> */}
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

        <p className="mt-6 text-sm font-light text-center ">
          Belum Punya Akun?{" "}
          <button
            onClick={() => router.push("/daftar")}
            className="font-semibold hover:underline"
          >
            DAFTAR
          </button>
        </p>
      </div>
    </div>
  );
}

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
  const name = useRef();
  const password = useRef();
  const passwordConf = useRef();
  const kode = useRef();
  const [pending, setPending] = useState(null);
  const router = useRouter();

  const singupHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    if (password.current.value !== passwordConf.current.value) {
      dispatch(
        showNotif({
          status: "Error",
          message: "Password konfirmasi tidak sama",
          action: null,
        })
      );
      setPending(false);
      return;
    }
    try {
      const response = await fetch(`api/daftar`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: name.current.value,
          email: email.current.value,
          password: password.current.value,
          kode: kode.current.value,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Tidak bisa buat akun");
      }

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

      if (!res.error) {
        router.replace("/dashboard");
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
        <h1 className="text-3xl font-semibold text-center ">Daftar Operator</h1>
        <form className="mt-6" onSubmit={singupHandler}>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              ref={email}
              type="email"
              required
              className="mt-2 input-field"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="name" className="block text-sm">
              Nama
            </label>
            <input
              ref={name}
              type="name"
              required
              className="mt-2 input-field"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
            </div>
            <input
              ref={password}
              required
              type="password"
              className="input-field mt-2"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="passwordCof" className="block text-sm">
                Konfirmasi Password
              </label>
            </div>
            <input
              ref={passwordConf}
              required
              type="password"
              className="input-field mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="kode" className="block text-sm">
              Kode Operator
            </label>
            <input
              ref={kode}
              type="password"
              required
              className="mt-2 input-field"
            />
          </div>

          <div className="mt-6">
            {pending ? <PendingButton /> : <SubmitFull text="Daftar" />}
          </div>
        </form>

        <p className="mt-6 text-sm font-light text-center">
          Sudah Punya Akun?{" "}
          <button
            onClick={() => router.push("/masuk")}
            className="font-semibol hover:underline"
          >
            MASUK
          </button>
        </p>
      </div>
    </div>
  );
}

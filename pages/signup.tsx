import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ApiHandleError, apiSignup } from "store/api/index";
import { userStoreSignin } from "store/reducers/User";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  failedField: null,
};

export default function Signup() {
  const [{ name, email, password, confirmPassword, failedField }, setForm] =
    useState(initialFormState);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setForm((prevState) => ({
      ...prevState,
      failedField: null,
    }));

    if (!name)
      return setForm((prevState) => ({
        ...prevState,
        failedField: "name",
      }));
    if (!email)
      return setForm((prevState) => ({
        ...prevState,
        failedField: "email",
      }));
    if (password.length < 8)
      return setForm((prevState) => ({
        ...prevState,
        failedField: "password",
      }));
    if (password !== confirmPassword)
      return setForm((prevState) => ({
        ...prevState,
        failedField: "confirmPassword",
      }));

    try {
      const { data } = await apiSignup(name, email, password);

      localStorage.setItem("token", data.access_token);

      router.push("/");
    } catch (err) {
      ApiHandleError(err);
    }
  };

  return (
    <>
      <Head>
        <title>Expoart - Signup</title>
      </Head>

      <main className="h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] py-8 px-12 border-2 bg-white flex flex-col gap-4"
        >
          <h1 className="text-2xl text-center mb-6 border-b-2 pb-3 text-gray-400">
            Signup
          </h1>
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failedField == "name",
            })}
            name="name"
            placeholder="Name"
            onChange={(evt) =>
              setForm((prevState) => ({ ...prevState, name: evt.target.value }))
            }
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failedField == "email",
            })}
            name="email"
            placeholder="E-mail"
            onChange={(evt) =>
              setForm((prevState) => ({
                ...prevState,
                email: evt.target.value,
              }))
            }
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failedField == "password",
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(evt) =>
              setForm((prevState) => ({
                ...prevState,
                password: evt.target.value,
              }))
            }
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failedField == "confirmPassword",
            })}
            name="password"
            type="password"
            placeholder="Confirm Password"
            onChange={(evt) =>
              setForm((prevState) => ({
                ...prevState,
                confirmPassword: evt.target.value,
              }))
            }
          />
          <input
            type="submit"
            value="Signup"
            className="bg-purple-600 text-white p-2 mt-6 font-bold hover:bg-purple-700 transition-colors cursor-pointer"
          />
          <input
            onClick={() => router.back()}
            type="button"
            value="Go Back"
            className="bg-gray-100 text-gray-400 p-2 hover:bg-gray-200 transition-colors cursor-pointer"
          />
        </form>
      </main>
    </>
  );
}

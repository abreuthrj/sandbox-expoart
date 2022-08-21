import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ApiHandleError, apiSignup } from "store/api/index";
import { userStoreSignin } from "store/reducers/User";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [failField, setFailField] = useState<
    "name" | "email" | "password" | "confirmPassword" | null
  >(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setFailField(null);

    if (!name) return setFailField("name");
    if (!email) return setFailField("email");
    if (password.length < 8) return setFailField("password");
    if (password !== confirmPassword) return setFailField("confirmPassword");

    try {
      const { data } = await apiSignup(name, email, password);
      dispatch(userStoreSignin(data));
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

      <div className="h-full flex items-center justify-center">
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
              "bg-red-200": failField == "name",
            })}
            name="name"
            placeholder="Name"
            onChange={(evt) => setName(evt.target.value)}
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failField == "email",
            })}
            name="email"
            placeholder="E-mail"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failField == "password",
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <input
            className={classNames({
              "p-4 bg-gray-50 outline-none": true,
              "bg-red-200": failField == "confirmPassword",
            })}
            name="password"
            type="password"
            placeholder="Confirm Password"
            onChange={(evt) => setConfirmPassword(evt.target.value)}
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
      </div>
    </>
  );
}

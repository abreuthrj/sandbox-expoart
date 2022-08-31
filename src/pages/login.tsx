import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { apiAuth, ApiHandleError } from "../store/api/";
import { userStoreSignin } from "../store/reducers/User";

const initialFormState = {
  email: "",
  password: "",
  loading: false,
};

export default function Login() {
  const [{ email, password, loading }, setForm] = useState(initialFormState);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setForm((prevState) => ({ ...prevState, loading: true }));

    try {
      const { data } = await apiAuth(email, password);
      console.log(data);

      localStorage.setItem("token", data.access_token);

      router.push("/");
    } catch (err) {
      ApiHandleError(err);
    } finally {
      setForm((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <>
      <Head>
        <title>Expoart - Signin</title>
      </Head>

      <main className="h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] py-8 px-12 border-2 bg-white flex flex-col gap-4"
        >
          <h1 className="text-2xl text-center mb-6 border-b-2 pb-3 text-gray-400">
            Signin
          </h1>
          <input
            className="p-4 bg-gray-50 outline-none"
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
            className="p-4 bg-gray-50 outline-none"
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
            type="submit"
            value="Signin"
            disabled={loading}
            className="bg-purple-600 text-white p-2 mt-6 font-bold hover:bg-purple-700 transition-colors cursor-pointer disabled:bg-purple-400"
          />
          <input
            onClick={() => router.push("/signup")}
            type="button"
            value="Signup"
            className="bg-gray-100 text-gray-400 p-2 hover:bg-gray-200 transition-colors cursor-pointer"
          />
        </form>
      </main>
    </>
  );
}

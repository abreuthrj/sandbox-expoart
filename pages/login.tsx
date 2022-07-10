import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { apiAuth } from "store/api/index";
import { userStoreSignin } from "store/reducers/User";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const { data } = await apiAuth(email, password);

      console.log(data);
      dispatch(userStoreSignin(data));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Expoart - Signin</title>
      </Head>

      <div className="h-full flex items-center justify-center">
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
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            className="p-4 bg-gray-50 outline-none"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <input
            type="submit"
            value="Signin"
            className="bg-purple-600 text-white p-2 mt-6 font-bold hover:bg-purple-700 transition-colors cursor-pointer"
          />
          <input
            onClick={() => router.back()}
            type="submit"
            value="Singnup"
            className="bg-gray-100 text-gray-400 p-2 hover:bg-gray-200 transition-colors cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}

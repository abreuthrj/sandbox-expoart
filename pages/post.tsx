import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { MdImage } from "react-icons/md";
import { apiCreatePost, ApiHandleError } from "store/api/index";

export default function Post() {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const { data } = await apiCreatePost(title);

      console.log(data);
      router.push("/");
    } catch (err) {
      if ((err as AxiosError).response?.status == 401) {
        window.localStorage.removeItem("token");
        router.push("/login");
      }

      ApiHandleError(err);
    }
  };

  return (
    <>
      <Head>
        <title>Expoart - Post</title>
      </Head>

      <div className="flex items-center justify-center h-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] py-8 px-12 border-2 bg-white flex flex-col gap-4"
        >
          <h1 className="text-2xl text-center mb-6 border-b-2 pb-3 text-gray-400">
            Create a Post
          </h1>
          <input
            className="p-4 bg-gray-50 outline-none"
            name="title"
            placeholder="Title"
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <div className="p-4 bg-gray-50 outline-none border-dashed border-4 flex flex-col items-center justify-center">
            <label className="text-gray-200 cursor-pointer">
              <MdImage size={128} color="#DEDEDE" />
              No image selected
              <input name="title" placeholder="Title" type="file" hidden />
            </label>
          </div>
          <input
            className="bg-purple-600 text-white p-2 mt-6 font-bold hover:bg-purple-700 transition-colors cursor-pointer"
            type="submit"
            value="Post"
          />
          <input
            className="bg-gray-100 text-gray-400 p-2 hover:bg-gray-200 transition-colors cursor-pointer"
            type="button"
            value="Go Back"
            onClick={() => router.back()}
          />
        </form>
      </div>
    </>
  );
}

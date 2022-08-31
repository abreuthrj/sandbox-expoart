import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdImage } from "react-icons/md";
import { useForm } from "../utils/hooks";
import { apiCreatePost, ApiHandleError } from "../store/api";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useRef } from "react";

const initialFormState = {
  title: "",
  image: "",
  loading: false,
};

export default function Post() {
  const router = useRouter();

  const [{ title, image, loading }, setForm] = useForm(initialFormState);
  const imageBase64 = useRef("");

  const onDrop = useCallback((files) => {
    URL.revokeObjectURL(image);

    const fr = new FileReader();
    fr.onloadend = () => {
      imageBase64.current = fr.result
        .toString()
        .replace("data:", "")
        .replace(/^.+,/, "");

      setForm({ image: URL.createObjectURL(files[0]) });
    };

    fr.readAsDataURL(files[0]);
  }, []);
  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setForm({ loading: true });

    try {
      const formData = new FormData();
      formData.append("key", "6d207e02198a847aa98d0a2a901485a5");
      formData.append("action", "upload");
      formData.append("source", imageBase64.current);
      formData.append("format", "json");

      const { data } = await axios.post(
        `http://freeimage.host/api/1/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setForm({ loading: false });
      return;
    }

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
    } finally {
      setForm({ loading: false });
    }
  };

  return (
    <>
      <Head>
        <title>Expoart - Post</title>
      </Head>

      <main className="flex items-center justify-center h-full">
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
            onChange={(evt) => setForm({ title: evt.target.value })}
          />
          <div
            className={classNames({
              "p-4 bg-gray-50 outline-none border-dashed border-4": true,
              "flex flex-col items-center justify-center": !image,
            })}
            {...getRootProps()}
          >
            {image ? (
              <Image
                src={image}
                width="100%"
                height="100%"
                objectFit="cover"
                layout="responsive"
              />
            ) : (
              <label className="text-gray-200 cursor-pointer">
                <MdImage size={128} color="#DEDEDE" />
                No image selected
                <input
                  name="title"
                  placeholder="Title"
                  type="file"
                  {...getInputProps()}
                  onChange={(evt) => onDrop(evt.target.files)}
                  hidden
                />
              </label>
            )}
          </div>
          <input
            className="bg-purple-600 text-white p-2 mt-6 font-bold hover:bg-purple-700 transition-colors cursor-pointer disabled:bg-purple-300"
            type="submit"
            value="Post"
            disabled={loading}
          />
          <input
            className="bg-gray-100 text-gray-400 p-2 hover:bg-gray-200 transition-colors cursor-pointer"
            type="button"
            value="Go Back"
            onClick={() => router.back()}
          />
        </form>
      </main>
    </>
  );
}

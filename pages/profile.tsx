import { Menu } from "components";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Profile() {
  const userInfo = {
    pic: "/avatar.webp",
    name: "Thiago",
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Expoart - Profile</title>
      </Head>

      <main className="flex flex-col items-center h-full">
        <div className="flex flex-col items-center bg-white p-12 h-full rounded-md w-full max-w-4xl gap-y-4 sm:h-auto sm:p-4 sm:m-12 sm:w-10/12">
          <Image
            src={userInfo.pic}
            width={72}
            height={72}
            objectFit="cover"
            className="rounded-full"
          />

          <strong>{userInfo.name}</strong>
        </div>
      </main>

      <Menu />
    </>
  );
}

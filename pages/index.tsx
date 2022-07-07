import Head from "next/head";
import { Post } from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>ExpoArt ~ Home</title>
      </Head>

      <div className="flex items-center justify-center">
        <Post
          title="The sunrainbow kiss"
          date="1 hour ago"
          user="user_anon2213"
          views={32}
          likes={8}
          liked={false}
        />
      </div>
    </>
  );
}

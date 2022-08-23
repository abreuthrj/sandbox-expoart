import Head from "next/head";
import { Menu, Post } from "components";
import { useEffect, useState } from "react";
import { apiGetPosts, ApiHandleError } from "store/api/index";
import { ApiPostType } from "store/api/types";
import { useStoreSelector } from "store/index";
import { useRouter } from "next/router";

export default function Home() {
  const [posts, setPosts] = useState<ApiPostType[]>([]);

  // Setup listeners
  useEffect(() => {
    apiGetPosts()
      .then((res) => {
        setPosts(res.data);
        console.log(res);
      })
      .catch((err) => ApiHandleError(err));
  }, []);

  return (
    <div className="py-8">
      <Head>
        <title>Expoart - Home</title>
      </Head>

      <main className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-0">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </main>

      <Menu />
    </div>
  );
}

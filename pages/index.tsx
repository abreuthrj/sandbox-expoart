import Head from "next/head";
import { Menu, Post } from "components";
import { useEffect, useState } from "react";
import { apiGetPosts } from "store/api/index";
import { ApiPostType } from "store/api/types";
import { useStoreSelector } from "store/index";
import { useRouter } from "next/router";

export default function Home() {
  const { id } = useStoreSelector((state) => state.User);
  const router = useRouter();

  const [posts, setPosts] = useState<ApiPostType[]>([]);

  // Setup listeners
  useEffect(() => {
    if (!id) router.replace("/login");

    apiGetPosts()
      .then((res) => {
        setPosts(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-8">
      <Head>
        <title>Expoart - Home</title>
      </Head>

      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      <Menu />
    </div>
  );
}

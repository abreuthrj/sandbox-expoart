import Head from "next/head";
import { Menu, Post } from "components";
import { useEffect, useState } from "react";
import { apiGetPosts } from "store/api/index";
import { ApiPostType } from "store/api/types";

export default function Home() {
  const [posts, setPosts] = useState<ApiPostType[]>([]);

  // Setup listeners
  useEffect(() => {
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
        <title>ExpoArt ~ Home</title>
      </Head>

      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {posts.map((post) => (
          <Post
            user={post.user}
            date={post.date}
            liked={post.liked}
            likes={post.likes}
            title={post.title}
            views={post.views}
            key={post.id}
          />
        ))}
      </div>

      <Menu />
    </div>
  );
}

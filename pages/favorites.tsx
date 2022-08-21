import Head from "next/head";
import { Menu, Post } from "components";
import { useEffect, useState } from "react";
import { apiGetFavorites, ApiHandleError } from "store/api/index";
import { ApiPostType } from "store/api/types";

export default function Favorites() {
  const [posts, setPosts] = useState<ApiPostType[]>([]);

  // Setup listeners
  useEffect(() => {
    apiGetFavorites()
      .then((res) => {
        setPosts(res.data);
        console.log(res);
      })
      .catch((err) => ApiHandleError(err));
  }, []);

  return (
    <div className="py-8">
      <Head>
        <title>ExpoArt ~ Favorites</title>
      </Head>

      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {posts.map((post) => (
          <Post
            user={post.user}
            date={post.date}
            liked={true}
            likes={post.likes}
            title={post.title}
            views={post.views}
            id={post.id}
            key={post.id}
          />
        ))}
      </div>

      <Menu />
    </div>
  );
}

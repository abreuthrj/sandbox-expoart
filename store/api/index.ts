import { User } from "@prisma/client";
import axios from "axios";
import store from "store/index";

const getUserId = () => store.getState().User.id;

export const apiGetPosts = () =>
  axios.get("/api/posts", {
    headers: {
      Authorization: getUserId(),
    },
  });

export const apiAuth = (email: string, password: string) =>
  axios.post<User>("/api/auth", { email, password });

export const apiLikePost = (post: string, like: boolean) =>
  axios.post(
    `/api/posts/${post}/like`,
    { like },
    {
      headers: {
        Authorization: getUserId(),
      },
    }
  );

export const apiSignup = (name: string, email: string, password: string) =>
  axios.post<User>("/api/signup", {
    name,
    email,
    password,
  });

export const apiGetFavorites = () =>
  axios.get("/api/posts/favorites", {
    headers: {
      Authorization: getUserId(),
    },
  });

export const apiCreatePost = (title: string) =>
  axios.post("/api/posts", { title });

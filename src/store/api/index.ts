import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ErrorType } from "./types";

const getAuthToken = () => `Bearer ${localStorage.getItem("token")}`;

export const apiGetPosts = () =>
  axios.get("/api/posts", {
    headers: {
      Authorization: getAuthToken(),
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
        Authorization: getAuthToken(),
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
      Authorization: getAuthToken(),
    },
  });

export const apiCreatePost = (title: string) =>
  axios.post(
    "/api/posts",
    { title },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    }
  );

export const apiFetchUserFromToken = (token: string) =>
  axios.get<User>(`/api/userFromToken/${token}`);

export const ApiHandleError = (err: AxiosError<ErrorType>) => {
  console.log(err);

  if (err.response) {
    if (err.response.status == 401) {
      toast("You must be authenticated", { type: "error" });
      return;
    }

    if (err.response.status == 404) {
      toast("Not Found", { type: "error" });
      return;
    }

    toast("An error ocurred", { type: "error" });
    return;
  }

  if (err.request) {
    toast("An error ocurred, check your connection and try again", {
      type: "error",
    });

    return;
  }
};

import axios from "axios";

export const apiGetPosts = () => axios.get("/api/posts");

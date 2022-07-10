import { User } from "@prisma/client";

export type ApiPostType = {
  title: string;
  date: string;
  user: User;
  views: number;
  likes: number;
  liked: boolean;
  id: string;
};

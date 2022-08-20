// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Post, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface CustomPostType extends Post {
  likes: number;
  views: number;
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<CustomPostType[]>
) {
  const prismaClient = new PrismaClient();

  const posts = await prismaClient.post.findMany({
    include: {
      user: true,
      UserPost: {
        select: {
          liked: true,
          viewed: true,
          user_id: true,
        },
      },
    },
  });

  const addLikeViewFields = posts.map<CustomPostType>((post) => ({
    ...post,
    likes: post.UserPost.filter((post) => post.liked).length,
    views: post.UserPost.filter((post) => post.liked).length,
    liked: !!post.UserPost.find(
      (post) => post.liked && post.user_id == req.headers.authorization
    ),
  }));

  if (posts) res.status(200).send(addLikeViewFields);
  else res.status(404).send([]);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Post>) {
  const { title } = req.body;
  const userId = req.headers.authorization;

  const prismaClient = new PrismaClient();
  console.log(title, userId);

  const user = prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return res.status(404).end();

  const post = await prismaClient.post.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (post) return res.status(200).send(post);
  else return res.status(400).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await postHandler(req, res);
    case "GET":
      return await getHandler(req, res);
    default:
      return res.status(404).end();
  }
}

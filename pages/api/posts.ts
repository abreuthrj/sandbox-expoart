// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Post, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JsonWebTokenError, Jwt, JwtPayload } from "jsonwebtoken";
import { ErrorType } from "store/api/types";

export interface CustomPostType extends Post {
  likes: number;
  views: number;
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<CustomPostType[] | ErrorType>
) {
  try {
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ) as JwtPayload;

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
      liked: !!post.UserPost.find((post) => post.liked && post.user_id == id),
    }));

    res.status(200).send(addLikeViewFields);
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      console.log(err);

      res.status(401).send({
        error: true,
        message: "Unauthorized",
      });

      return;
    }

    res.status(404).send({
      error: true,
      message: err.message || "Unable to fetch posts",
    });
  }
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorType>
) {
  const { title } = req.body;

  try {
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ) as JwtPayload;

    const prismaClient = new PrismaClient();

    const post = await prismaClient.post.create({
      data: {
        title,
        user: {
          connect: {
            id,
          },
        },
      },
    });

    res.status(200).send(post);
  } catch (err) {
    return res.status(401).send({
      error: true,
      message: err.message || "You must be authenticated for this",
    });
  }
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

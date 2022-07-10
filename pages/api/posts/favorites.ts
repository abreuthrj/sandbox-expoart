import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.headers.authorization;
  if (!userId) return res.status(401).end();

  const prismaClient = new PrismaClient();

  const posts = await prismaClient.post.findMany({
    include: {
      user: true,
    },
    where: {
      UserPost: {
        some: {
          liked: true,
          user_id: userId,
        },
      },
    },
  });

  if (posts) res.status(200).send(posts);
  else res.status(400).end();
}

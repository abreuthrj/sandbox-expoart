import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
      },
      where: {
        UserPost: {
          some: {
            liked: true,
            user_id: id,
          },
        },
      },
    });

    res.status(200).send(posts);
  } catch (err) {
    res.status(404).send({
      error: true,
      message: err?.name || "Unable to get favorites",
    });
  }
}

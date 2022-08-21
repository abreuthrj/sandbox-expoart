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

    const postId =
      typeof req.query.postId == "string"
        ? req.query.postId
        : req.query.postId[0];

    const like = req.body.like;

    const relation = await prismaClient.userPost.findFirst({
      where: {
        user_id: id,
        post_id: postId,
      },
    });

    if (relation)
      await prismaClient.userPost.update({
        data: {
          liked: like,
          viewed: true,
        },
        where: {
          id: relation.id,
        },
      });
    else
      await prismaClient.userPost.create({
        data: {
          liked: like,
          viewed: true,
          post_id: postId,
          user_id: id,
        },
      });

    res.status(200).send(null);
  } catch (err) {
    res.status(404).send({
      error: true,
      message: "Unable to interact with post",
      details: JSON.stringify(err),
    });
  }
}

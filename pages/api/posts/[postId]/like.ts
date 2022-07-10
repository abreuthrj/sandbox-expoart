import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prismaClient = new PrismaClient();
  const postId =
    typeof req.query.postId == "string"
      ? req.query.postId
      : req.query.postId[0];
  const userId = req.headers.authorization;
  const like = req.body.like;

  if (
    !(await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    }))
  )
    return res.status(401).send(null);

  try {
    const relation = await prismaClient.userPost.findFirst({
      where: {
        user_id: userId,
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
          user_id: userId,
        },
      });

    res.status(200).send(null);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorType } from "../../../store/api/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorType>
) {
  if (!(req.query.token && typeof req.query.token == "string"))
    return res.status(400).send({
      error: true,
      message: "Token not received",
    });

  const { token } = req.query;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const prismaClient = new PrismaClient();

    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user)
      return res.status(404).send({
        error: true,
        message: "User not found",
      });

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      error: true,
      message: "Something bad happened! Try again",
    });
  }
}

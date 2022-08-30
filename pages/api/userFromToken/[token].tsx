import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorType } from "store/api/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorType>
) {
  try {
    if (!(req.query.token && typeof req.query.token == "string"))
      throw "Token not sent";

    const { token } = req.query;
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const prismaClient = new PrismaClient();
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user) return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send({
      error: true,
      message: "User not found",
      details: err,
    });
  }
}

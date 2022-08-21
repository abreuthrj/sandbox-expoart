import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ErrorType } from "store/api/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorType>
) {
  if (req.method !== "POST") return res.status(400).send(null);

  const prismaClient = new PrismaClient();

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const updatedUser = await prismaClient.user.update({
      where: { id: user.id },
      data: { access_token: newToken },
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(404).send({
      error: true,
      message: err.name || "Unable to generate new token",
    });
  }
}

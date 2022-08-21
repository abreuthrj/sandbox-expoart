import { prisma, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorType } from "store/api/types";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorType>
) {
  if (req.method !== "POST") return res.status(400).send(null);

  const { name, email, password } = req.body;
  const prismaClient = new PrismaClient();

  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        access_token: "Temporary Token",
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const updatedUser = await prismaClient.user.update({
      where: { id: user.id },
      data: { access_token: token },
    });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(404).send({
      error: true,
      message: err.message || "Unable to signup",
    });
  }
}

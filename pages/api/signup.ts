import { prisma, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  if (req.method !== "POST") return res.status(400).send(null);

  const { name, email, password } = req.body;
  const prismaClient = new PrismaClient();

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      access_token: "uio18234n823y42y34023h4",
    },
  });

  if (user) res.status(200).send(user);
  else res.status(404).send(null);
}

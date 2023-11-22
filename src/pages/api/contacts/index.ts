/* eslint-disable no-console */
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

import { Contact } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ contacts: Array<Contact> } | { message: string }>,
) {
  try {
    const { rows: contacts } = await sql<Contact>`SELECT * FROM contacts;`;

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error while getting all contacts" });
  }
}

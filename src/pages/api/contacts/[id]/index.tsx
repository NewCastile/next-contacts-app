/* eslint-disable no-console */
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

import { Contact } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ contact: Contact } | { message: string }>,
) {
  const { id: contact_id } = req.query;

  if (!contact_id) return res.status(500).json({ message: "Missing id query parameter" });
  if (Array.isArray(contact_id))
    return res.status(500).json({ message: "Parameter id is an array of strings" });

  try {
    const { rows: contacts, rowCount } =
      await sql<Contact>`SELECT * FROM contacts WHERE contact_id = ${contact_id};`;

    if (!rowCount) {
      throw new Error("Contact not found.");
    }

    const [contact] = contacts;

    return res.status(200).json({ contact });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error while getting contact" });
  }
}

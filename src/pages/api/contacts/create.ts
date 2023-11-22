/* eslint-disable no-console */
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { contact_name, contact_email, contact_phone } = JSON.parse(req.body);

    try {
      await sql`
        INSERT INTO contacts(contact_name, contact_email, contact_phone)
        VALUES (${contact_name}, ${contact_email}, ${contact_phone})
        RETURNING *;
    `;

      return res.status(200).json({ message: `Added new contact ${contact_name}` });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && "code" in error && error.code === "23505") {
        return res.status(500).json({
          message:
            "A contact registered on the database shares unique information with the introduced values.",
        });
      }

      return res.status(500).json({ message: "Error while creating new contact" });
    }
  }
}

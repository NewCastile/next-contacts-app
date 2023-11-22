/* eslint-disable no-console */
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { contact_name, contact_email, contact_phone } = JSON.parse(req.body);
    const { id: contact_id } = req.query;

    if (!contact_id) return res.status(500).json({ message: "Missing id query parameter" });
    if (Array.isArray(contact_id))
      return res.status(500).json({ message: "Parameter id is an array of strings" });

    try {
      await sql`
        UPDATE contacts
        SET contact_name = ${contact_name},
            contact_email = ${contact_email},
            contact_phone = ${contact_phone}
        WHERE contact_id = ${contact_id};
    `;

      return res.status(200).json({ message: `Update contact ${contact_name}` });
    } catch (error) {
      console.log(error);
      if (error instanceof Error && "code" in error && error.code === "23505")
        return res.status(500).json({
          message:
            "A contact registered on the database shares unique information with the introduced values.",
        });

      return res.status(500).json({ message: "Error while updating contact" });
    }
  }
}

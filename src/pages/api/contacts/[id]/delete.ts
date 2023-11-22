/* eslint-disable no-console */
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id: contact_id } = req.query;

    if (!contact_id) return res.status(500).json({ message: "Missing id query parameter" });
    if (Array.isArray(contact_id))
      return res.status(500).json({ message: "Parameter id is an array of strings" });

    try {
      await sql`
        DELETE FROM contacts WHERE contact_id = ${contact_id};
    `;

      return res.status(200).json({ message: `Contact deleted successfully!` });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Error while deleting contact..." });
    }
  }
}

import { z } from "zod";

import { PHONE_NUMBER_REGEXP } from "./phone-number-regexp";

export const BodyParseSchema = z.object({
  contact_name: z.string(),
  contact_email: z.string().email(),
  contact_phone: z
    .string()
    .refine((val) => val.match(PHONE_NUMBER_REGEXP), { message: "Invalid phone number." }),
});

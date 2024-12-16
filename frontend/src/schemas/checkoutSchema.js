import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name must not exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address must not exceed 100 characters" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long" })
    .max(50, { message: "City must not exceed 50 characters" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters long" })
    .max(50, { message: "State must not exceed 50 characters" }),
  zipCode: z
    .string()
    .regex(/^\d{6}(-\d{4})?$/, {
      message: "Invalid ZIP Code format (e.g., 12345 or 12345-6789)",
    }),
});

export default checkoutSchema

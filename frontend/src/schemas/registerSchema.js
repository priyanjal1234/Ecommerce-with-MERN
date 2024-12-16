import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters")
    ,

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must not exceed 100 characters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    
    .max(10, "Phone number must be at most 10 digits")
    .regex(
      /^\+?[0-9]+$/,
      "Phone number can only contain numbers and an optional leading '+'"
    ),
});

export default registerSchema;

import z from "zod";

export const shopLoginValidate = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email("Invalid email"),

  password: z
    .string({ message: "Password is required" })
    .trim()
});
import * as z from "zod";

export const CreateNewPasswordSchema = z.object({
  passLength: z.number().min(6).max(20),
  password: z.string().min(6).max(20),
});

export type FormData = z.infer<typeof CreateNewPasswordSchema>;

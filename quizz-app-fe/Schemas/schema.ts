import {z} from "zod";

export const loginSchema = z.object({
    name: z.string().min(2, {message: "Name muss mindestens 2 Zeichen lang sein"}),
    email: z.string().email({message: "Email Adresse ist nicht gültig"}),
})

export type LoginSchema = z.infer<typeof loginSchema>
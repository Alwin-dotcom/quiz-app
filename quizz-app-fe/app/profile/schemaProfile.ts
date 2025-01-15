import {z} from "zod";

export const profileSchema = z
    .object({
        name: z.string().min(2, "Der Name muss mindestens 1 Zeichen lang sein."),
        nachname: z.string().min(2, "Der Nachname muss mindestens 1 Zeichen lang sein."),
        email: z.string().email("Bitte eine gültige E-Mail eingeben."),
        password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein."),
        confirmPassword: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein."),


    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Das Passwort und die Bestätigung müssen übereinstimmen.",
    });

export type ProfileFormValues = z.infer<typeof profileSchema>;
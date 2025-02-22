import {z} from "zod";

// Zod-Schema für die Validierung
export const loginSchema = z.object({
    username: z.string().min(3, "Der Nutzername muss mindestens 3 Zeichen lang sein."),
    password: z.string().min(2, "Das Passwort muss mindestens 6 Zeichen lang sein."),
});

// Typen für das Formular basierend auf dem Schema
export type LoginFormValues = z.infer<typeof loginSchema>;
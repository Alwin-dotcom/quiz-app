import { z } from "zod";

// Zod-Schema für die Validierung
export const loginSchema = z.object({
    email: z.string().email("Bitte eine gültige E-Mail eingeben."),
    password: z.string().min(6, "Das Passwort muss mindestens 6 Zeichen lang sein."),
});

// Typen für das Formular basierend auf dem Schema
export type LoginFormValues = z.infer<typeof loginSchema>;
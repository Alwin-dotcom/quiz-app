"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box } from "@mui/material";
import { LoginFormValues, loginSchema } from "@/Schemas/schema";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
    const router = useRouter();

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormValues>({
        mode: "all",
        resolver: zodResolver(loginSchema),
    });

    // Login-Handler
    const onSubmit = async (data: LoginFormValues) => {
        try {
            // API-Request an Backend
            const response = await axios.post("http://localhost:8080/login", {
                username: data.email,
                password: data.password,
            });

            // Token aus der Antwort speichern
            const token = response.data.token;
            localStorage.setItem("authToken", token); // Im LocalStorage speichern

            // Weiterleitung nach erfolgreichem Login
            router.push("/");
        } catch (error) {
            console.error("Login fehlgeschlagen:", error);
            alert("Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, mt: 2 }}
        >
            {/* E-Mail-Feld */}
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="E-Mail"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                    />
                )}
            />

            {/* Passwort-Feld */}
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Passwort"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />
                )}
            />

            {/* Login-Button */}
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
            <DevTool control={control} />
        </Box>
    );
};

export default LoginForm;

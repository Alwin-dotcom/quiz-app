"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box } from "@mui/material";
import { LoginFormValues,loginSchema } from "@/Schemas/schema";


const LoginForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Form Data:", data);
        // Hier kannst du eine API-Anfrage starten
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, margin: "auto", mt: 5 }}
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
        </Box>
    );
};

export default LoginForm;

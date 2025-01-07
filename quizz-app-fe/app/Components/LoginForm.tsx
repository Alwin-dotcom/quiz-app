"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import {LoginFormValues} from "@/Schemas/schema";

const LoginForm = () => {
    const router = useRouter();

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormValues>({
        mode: "all",
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await axios.post("http://localhost:8080/realms/myrealm/protocol/openid-connect/token", {
                grant_type: "password",
                client_id: "RXU0px7H6VylFsSbXLEZa7VqZeaapbEl",
                client_secret: "NT-JVLzpsPZPfxsk9blaJw-mG-yLO4DH_Tw9Thxki1sdcx7P_m6kNgPTvNabDQf9",
                username: data.email,
                password: data.password,
                scope: "openid profile email",
            });
            const token = response.data.access_token;
            localStorage.setItem("authToken", token);

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

            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;

"use client";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import axios from "axios";
import {LoginFormValues} from "@/Schemas/schema";

const LoginForm = () => {
    
    const router = useRouter();

    const {handleSubmit, control, formState: {errors}} = useForm<LoginFormValues>({
        mode: "all",
    });

    const getDashboardData = async (token: string) => {
        try {
            const response = await axios.get("http://localhost:8080/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`, // Senden des Tokens im Authorization-Header
                },
            });

            console.log(response.data); // Daten vom Dashboard
            // Du kannst jetzt den Benutzer zur Dashboard-Seite weiterleiten oder entsprechende Aktionen ausführen
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await axios.post("https://dev-ttr18ohq2rtiayws.us.auth0.com/oauth/token", {
                grant_type: "password",
                client_id: "RXU0px7H6VylFsSbXLEZa7VqZeaapbEl",
                client_secret: "NT-JVLzpsPZPfxsk9blaJw-mG-yLO4DH_Tw9Thxki1sdcx7P_m6kNgPTvNabDQf9",
                username: data.email,
                password: data.password,
                scope: "openid profile email",
            });

            const token = response.data.access_token;
            localStorage.setItem("authToken", token);

            // Dashboard-Daten nach erfolgreichem Login abrufen
            getDashboardData(token);

            // Weiterleitung zur Hauptseite
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
            sx={{display: "flex", flexDirection: "column", gap: 2, width: 300, mt: 2}}
        >
            <Controller
                name="email"
                control={control}
                render={({field}) => (
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
                render={({field}) => (
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

"use client";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import axios from "axios";
import {LoginFormValues, loginSchema} from "@/Schemas/schema";
import {zodResolver} from "@hookform/resolvers/zod";

const LoginForm = () => {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<LoginFormValues>({
        mode: "all",
        resolver: zodResolver(loginSchema),
    });

    const requestAuthToken = async (email: string, password: string) => {
        try {
            const authResponse = await axios.post("https://dev-ttr18ohq2rtiayws.us.auth0.com/oauth/token", {
                grant_type: "password",
                client_id: "W48J0fA9kHkUlGXWnOjMxggvQAWpXRfJ",
                client_secret: "67SA11WLvf_cR21zIkVmc6cFwFtVZh78uQ2_9yX-e2cIy9oZUvxTgqiihL21wtmC",
                username: email,
                password: password,
                scope: "openid profile email",
            });

            console.log("Auth0 Antwort:", authResponse);

            if (authResponse.status !== 200) {
                throw new Error(`Auth0 Rückgabe Fehler: ${authResponse.status}`);
            }

            return authResponse.data?.access_token;
        } catch (error) {
            throw new Error("Fehler beim Anfordern des Auth0 Tokens");
        }
    };

    const validateToken = (token: string) => {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000;
        if (Date.now() >= expirationTime) {
            console.error("Token abgelaufen");
            localStorage.removeItem("authToken");
            throw new Error("Token abgelaufen");
        }
    };

    const fetchQuestions = async (token: string) => {
        try {
            const questionResponse = await axios.get("http://localhost:8080/quiz-app/resources/question-answer", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return questionResponse.data;
        } catch (error) {
            throw new Error("Fehler beim Abrufen der Fragen");
        }
    };

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const token = await requestAuthToken(data.email, data.password);

            if (!token) {
                throw new Error("Kein Access Token erhalten");
            }

            localStorage.setItem("authToken", token);
            console.log("Gespeicherter Token:", localStorage.getItem("authToken"));

            validateToken(token);

            const questions = await fetchQuestions(token);

            console.log("Fragen:", questions);
            router.push("/");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios Fehler:", error.response?.data);
                if (error.response?.status === 401) {
                    console.error("Ungültige Anmeldedaten oder unautorisierter Zugriff");
                } else if (error.response?.status === 400) {
                    console.error("Fehlerhafte Anfrage an Auth0");
                }
            } else if (error instanceof Error) {
                console.error("Login fehlgeschlagen:", error.message);
            } else {
                console.error("Unbekannter Fehler:", error);
            }
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

            <Button type="submit" variant="contained"
                    sx={{
                        backgroundColor: "#060440",
                    }}>
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
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

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/quiz-app/resources/user/info",
                {
                    auth: {
                        username: data.username,
                        password: data.password,
                    },
                    withCredentials: true,
                }
            );
            console.log("Erfolgreich angemeldet:", response.data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            router.push("/home");
        } catch (error) {
            console.error("Login fehlgeschlagen", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{display: "flex", flexDirection: "column", gap: 2, width: 300, mt: 2}}
        >
            <Controller
                name="username"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Nutzername"
                        variant="outlined"
                        error={!!errors.username}
                        helperText={errors.username?.message}
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
            <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                sx={{backgroundColor: "#060440"}}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;

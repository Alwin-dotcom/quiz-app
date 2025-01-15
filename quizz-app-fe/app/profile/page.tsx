'use client'
import {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {profileSchema, ProfileFormValues} from './schemaProfile';

export default function ProfilePage() {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
    });

    const onSubmit = (data: ProfileFormValues) => {
        console.log('Profildaten:', data);
    };

    return (
        <Box
            className="shadow-md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                borderRadius: 3,
                width: '40%',
                mx: 'auto',
                mt: '200px',
                backgroundColor: '#f9f9f9',

            }}
        >
            <Typography variant="h4" sx={{mb: 3}}>
                Profil bearbeiten
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Vorname"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    )}
                />

                <Controller
                    name="nachname"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Nachname"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            error={!!errors.nachname}
                            helperText={errors.nachname ? errors.nachname.message : ''}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="E-Mail"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Passwort"
                            variant="outlined"
                            type="password"
                            fullWidth
                            sx={{mb: 2}}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Passwort bestätigen"
                            variant="outlined"
                            type="password"
                            fullWidth
                            sx={{mb: 2}}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        width: '100%',
                        backgroundColor: '#060440',
                        borderRadius: 5,
                        py: 3.5,
                        mt: 3,
                    }}
                >
                    Profil speichern
                </Button>
            </form>
        </Box>
    );
}
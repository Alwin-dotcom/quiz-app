'use client';
import React, {useState} from "react";
import {useForm, useFieldArray, Controller} from "react-hook-form";
import {Input, RadioGroup, Radio} from "@heroui/react";
import {Button, Snackbar, SnackbarOrigin} from "@mui/material";
import axios from "axios";

interface Answer {
    text: string;
}

interface Question {
    text: string;
    answers: Answer[];
    correctAnswerIndex: number | null;
}

interface FormValues {
    moduleName: string;
    creatorName: string;
    quizQuestions: Question[];
}

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function AddQuizModule() {
    const {register, control, handleSubmit} = useForm<FormValues>({
        defaultValues: {
            moduleName: "",
            creatorName: "",
            quizQuestions: [
                {
                    text: "",
                    answers: Array.from({length: 4}, () => ({text: ""})),
                    correctAnswerIndex: 0,
                },
            ],
        },
    });

    const {fields, append} = useFieldArray({
        control,
        name: "quizQuestions",
    });


    const [snackbarState, setSnackbarState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const {vertical, horizontal, open} = snackbarState;

    const handleClose = () => {
        setSnackbarState((prev) => ({...prev, open: false}));
    };

    const onSubmit = async (data: FormValues) => {
        for (const question of data.quizQuestions) {
            const payload = {
                module: data.moduleName,
                creator: data.creatorName,
                question: question.text,
                answers: question.answers.map((answer, index) => ({
                    answer: answer.text,
                    isCorrect: question.correctAnswerIndex === index,
                })),
            };
            try {
                console.log("Sending payload:", payload);
                await axios.post(
                    "http://localhost:8080/quiz-app/resources/question-answer",
                    payload,
                    {
                        headers: {
                            Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                        },
                        withCredentials: true
                    }
                );
                console.log("Quiz created successfully");
                setSnackbarState({
                    open: true,
                    vertical: 'bottom',
                    horizontal: 'right',
                });
            } catch (error) {
                console.error("Error saving quiz:", error);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-md flex flex-col items-center mt-20 p-3 rounded-md w-3/5 mx-auto bg-[#0000] "
        >
            <h4 className="text-2xl text-seaBlue font-bold mb-3 text-center">
                Fragen hinzufügen
            </h4>

            <Input label="Modul Kürzel" {...register("moduleName")} className="mb-3 w-full"/>

            {fields.map((question, qIndex) => (
                <div key={question.id} className="mb-3 w-full">
                    <Input
                        label={`Frage ${qIndex + 1}`}
                        {...register(`quizQuestions.${qIndex}.text` as const)}
                        className="mb-2 w-full"
                    />

                    <div>
                        <Controller
                            control={control}
                            name={`quizQuestions.${qIndex}.correctAnswerIndex`}
                            defaultValue={0}
                            render={({field}) => (
                                <RadioGroup
                                    value={field.value !== null ? String(field.value) : null}
                                    onValueChange={field.onChange}
                                >
                                    {question.answers.map((_, aIndex) => (
                                        <div key={aIndex} className="flex items-center mb-1">
                                            <Input
                                                label={`Antwort ${aIndex + 1}`}
                                                {...register(
                                                    `quizQuestions.${qIndex}.answers.${aIndex}.text` as const
                                                )}
                                                className="flex-1 mr-2"
                                            />
                                            <Radio
                                                value={String(aIndex)}
                                                {...({label: `Antwort ${aIndex + 1}`} as any)}
                                            />
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                    </div>
                </div>
            ))}

            <div className="flex flex-row justify-center items-center w-full mb-3">
                <Button
                    type="submit"
                    sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#060440",
                        borderRadius: 5,
                        py: 3.5,
                        mt: 5,
                    }}
                    variant="contained"
                >
                    Quiz speichern
                </Button>
            </div>

            <div className="flex flex-row justify-center items-center w-full mb-3">
                <Button
                    onClick={() =>
                        append({
                            text: "",
                            answers: Array.from({length: 4}, () => ({text: ""})),
                            correctAnswerIndex: 0,
                        })
                    }
                    sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#060440",
                        borderRadius: 5,
                        py: 3.5,
                        mt: 5,
                    }}
                    variant="contained"
                >
                    Weitere Frage hinzufügen
                </Button>
            </div>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleClose}
                message="Frage erfolgreich gespeichert"
                key={vertical + horizontal}
            />
        </form>

    );
}

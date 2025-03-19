'use client';
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, RadioGroup, Radio } from "@heroui/react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    SnackbarOrigin,
} from "@mui/material";
import { useUser } from "@/app/Context/UserContext";
import api from "../../api";

interface Answer {
    answer: string;
    isCorrect: boolean;
}

interface Question {
    questionId?: number;
    question: string;
    answers: Answer[];
    correctAnswerIndex: number;
    status: string | null;
    creator?: string;
}

interface FormValues {
    quizQuestions: Question[];
}

const editQuizSchema = z.object({
    quizQuestions: z.array(
        z.object({
            questionId: z.number().optional(),
            question: z.string().min(1, "Frage darf nicht leer sein"),
            answers: z.array(
                z.object({
                    answer: z.string().min(1, "Antwort darf nicht leer sein"),
                    isCorrect: z.boolean(),
                })
            ).length(4),
            correctAnswerIndex: z.number().min(0).max(3),
            status: z.string().nullable(),
            creator: z.string().optional(),
        })
    ),
});

const EditModulePage = () => {
    const { edit } = useParams();
    const moduleName = edit;
    const { userInfo } = useUser();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(editQuizSchema),
        defaultValues: { quizQuestions: [] },
    });

    const { fields } = useFieldArray({
        control,
        name: "quizQuestions",
    });

    useEffect(() => {
        if (moduleName) {
            api
                .get(`/quiz-app/resources/question-answer/modules/${moduleName}`, {
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
                            ),
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    const questions: Question[] = response.data.map((item: any) => ({
                        questionId: item.id,
                        question: item.question,
                        answers: item.answers.map((ans: any) => ({
                            answer: ans.answer,
                            isCorrect: ans.isCorrect,
                        })),
                        correctAnswerIndex: item.answers.findIndex((ans: any) => ans.isCorrect),
                        status: item.status,
                        creator: item.creator,
                    }));
                    reset({ quizQuestions: questions });
                })
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            console.error("Module name is not defined");
        }
    }, [moduleName, reset]);

    interface State extends SnackbarOrigin {
        open: boolean;
    }

    const [snackbarState, setSnackbarState] = React.useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const { vertical, horizontal, open } = snackbarState;
    const handleClose = () => {
        setSnackbarState((prev) => ({ ...prev, open: false }));
    };

    const updateStatus = async (
        questionId: number,
        status: "APPROVED" | "REJECTED"
    ) => {
        try {
            await api.post(
                `/quiz-app/resources/question-answer/${questionId}/${status}`,
                null,
                {
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
                            ),
                    },
                    withCredentials: true,
                }
            );
            console.log(`Status für Frage ${questionId} erfolgreich auf ${status} gesetzt`);
            setSnackbarState({
                open: true,
                vertical: "bottom",
                horizontal: "right",
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // updateQuestionAnswer wird jetzt mit validierten Daten aufgerufen
    const updateQuestionAnswer = async (question: Question, questionIndex: number) => {
        const payload = {
            id: question.questionId,
            module: moduleName,
            question: question.question,
            answers: question.answers.map((ans: Answer, index: number) => ({
                answer: ans.answer,
                isCorrect: question.correctAnswerIndex === index,
            })),
        };
        try {
            console.log("Sending payload:", payload);
            await api.put("/quiz-app/resources/question-answer/", payload, {
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
                        ),
                },
                withCredentials: true,
            });
            console.log("Quiz updated successfully");
            setSnackbarState({
                open: true,
                vertical: "bottom",
                horizontal: "right",
            });
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    const onSubmit = async (data: FormValues) => {
        for (const [index, question] of data.quizQuestions.entries()) {
            const payload = {
                id: question.questionId,
                module: moduleName,
                question: question.question,
                answers: question.answers.map((ans, idx) => ({
                    answer: ans.answer,
                    isCorrect: question.correctAnswerIndex === idx,
                })),
            };
            try {
                console.log("Sending payload for question", index, payload);
                await api.put("/quiz-app/resources/question-answer/", payload, {
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
                            ),
                    },
                    withCredentials: true,
                });
            } catch (error) {
                console.error("Error updating quiz:", error);
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow-md flex flex-col items-center mt-20 p-3 rounded-md w-3/5 mx-auto bg-[#f9f9f9]"
            >
                <h4 className="text-2xl text-seaBlue font-bold mb-3 text-center">Fragen bearbeiten</h4>
                {fields.map((field, qIndex) => {
                    const isCreator = userInfo?.userName === field.creator;
                    return (
                        <div key={field.id} className="mb-3 w-full">
                            <Input
                                label={`Frage ${qIndex + 1}`}
                                {...register(`quizQuestions.${qIndex}.question` as const)}
                                className="mb-2 w-full"
                            />
                            {errors.quizQuestions?.[qIndex]?.question && (
                                <p className="text-red-500">
                                    {errors.quizQuestions[qIndex].question.message}
                                </p>
                            )}
                            <Controller
                                control={control}
                                name={`quizQuestions.${qIndex}.correctAnswerIndex`}
                                defaultValue={0}
                                render={({ field: radioField }) => (
                                    <RadioGroup
                                        value={
                                            radioField.value !== null ? String(radioField.value) : null
                                        }
                                        onValueChange={(val) =>
                                            radioField.onChange(parseInt(val, 10))
                                        }
                                    >
                                        {field.answers.map((_, aIndex) => (
                                            <div key={aIndex} className="flex items-center mb-1">
                                                <Input
                                                    label={`Antwort ${aIndex + 1}`}
                                                    {...register(
                                                        `quizQuestions.${qIndex}.answers.${aIndex}.answer` as const
                                                    )}
                                                    className="flex-1 mr-2"
                                                />
                                                {errors.quizQuestions?.[qIndex]?.answers?.[aIndex]?.answer && (
                                                    <p className="text-red-500">
                                                        {errors.quizQuestions[qIndex].answers[aIndex].answer.message}
                                                    </p>
                                                )}
                                                <Radio
                                                    value={String(aIndex)}
                                                    {...({ label: `Antwort ${aIndex + 1}` } as any)}
                                                />
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Controller
                                    control={control}
                                    name={`quizQuestions.${qIndex}.status`}
                                    defaultValue={field.status || ""}
                                    render={({ field: statusField }) => (
                                        <Select
                                            {...statusField}
                                            label="Status"
                                            variant="outlined"
                                            disabled={isCreator}
                                            onChange={(e) => {
                                                const newStatus = e.target.value as "APPROVED" | "REJECTED";
                                                statusField.onChange(e);
                                                const currentQuestion = field;
                                                if (currentQuestion && currentQuestion.questionId) {
                                                    updateStatus(currentQuestion.questionId, newStatus);
                                                } else {
                                                    console.error("Frage-ID nicht gefunden!");
                                                }
                                            }}
                                        >
                                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                                            <MenuItem value="REJECTED">REJECTED</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <div className="flex flex-row justify-center items-center w-full mb-3">
                                {/* Hier wird handleSubmit aufgerufen – nur wenn die Validierung erfolgreich ist, wird updateQuestionAnswer aufgerufen */}
                                <Button
                                    type="button"
                                    onClick={handleSubmit((data) =>
                                        updateQuestionAnswer(data.quizQuestions[qIndex], qIndex)
                                    )}
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
                                    Frage speichern
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </form>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="Frage erfolgreich gespeichert"
                key={vertical + horizontal}
            />
        </>
    );
};

export default EditModulePage;

'use client';
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, RadioGroup, Radio } from "@heroui/react";
import { Button, Snackbar, SnackbarOrigin } from "@mui/material";
import api from "../../api";

const quizSchema = z.object({
    moduleName: z.string().min(1, "Modul Kürzel ist erforderlich"),
    creatorName: z.string().min(1, "Ersteller Name ist erforderlich"),
    quizQuestions: z.array(
        z.object({
            text: z.string().min(1, "Fragentext darf nicht leer sein"),
            answers: z.array(z.object({ text: z.string().min(1, "Antwort darf nicht leer sein") })).length(4),
            correctAnswerIndex: z.number().min(0).max(3),
        })
    ),
});

export default function AddQuizModule() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            moduleName: "",
            creatorName: "",
            quizQuestions: [
                {
                    text: "",
                    answers: Array.from({ length: 4 }, () => ({ text: "" })),
                    correctAnswerIndex: 0,
                },
            ],
        },
    });

    const { fields, append } = useFieldArray(
        { control, name: "quizQuestions" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    interface State extends SnackbarOrigin {
        open: boolean;
    }
    const [snackbarState, setSnackbarState] = React.useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });


    const { vertical, horizontal, open } = snackbarState;
    const handleClose = () => setSnackbarState((prev) => ({ ...prev, open: false }));

    const onSubmit = async (data: z.infer<typeof quizSchema>) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
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
                await api.post("/quiz-app/resources/question-answer", payload, {
                    headers: {
                        Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`),
                    },
                    withCredentials: true,
                });
            }
            setSnackbarState({ open: true, vertical: "bottom", horizontal: "right" });
        } catch (error) {
            console.error("Error saving quiz:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // @ts-ignore
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-md flex flex-col items-center mt-20 p-3 rounded-md w-3/5 mx-auto bg-[#0000] ">
            <h4 className="text-2xl text-seaBlue font-bold mb-3 text-center">Fragen hinzufügen</h4>
            <Input label="Modul Kürzel" {...register("moduleName")} className="mb-3 w-full" />
            {errors.moduleName && <p className="text-red-500">{errors.moduleName.message}</p>}
            <Input label="Ersteller Name" {...register("creatorName")} className="mb-3 w-full" />
            {errors.creatorName && <p className="text-red-500">{errors.creatorName.message}</p>}
            {fields.map((question, qIndex) => (
                <div key={question.id} className="mb-3 w-full">
                    <Input label={`Frage ${qIndex + 1}`} {...register(`quizQuestions.${qIndex}.text`)} className="mb-2 w-full" />
                    {errors.quizQuestions?.[qIndex]?.text && <p className="text-red-500">{errors.quizQuestions[qIndex].text.message}</p>}
                    <Controller
                        control={control}
                        name={`quizQuestions.${qIndex}.correctAnswerIndex`}
                        defaultValue={0}
                        render={({ field }) => (
                            <RadioGroup value={field.value.toString()} onValueChange={(val) => field.onChange(parseInt(val, 10))}>
                                {question.answers.map((_, aIndex) => (
                                    <div key={aIndex} className="flex items-center mb-1">
                                        <Input label={`Antwort ${aIndex + 1}`} {...register(`quizQuestions.${qIndex}.answers.${aIndex}.text`)} className="flex-1 mr-2" />
                                        {errors.quizQuestions?.[qIndex]?.answers?.[aIndex]?.text && (
                                            <p className="text-red-500">{errors.quizQuestions[qIndex].answers[aIndex].text.message}</p>
                                        )}
                                        <Radio value={String(aIndex)} />
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    />
                </div>
            ))}
            <Button type="submit" sx={{ width: 200, height: 50, backgroundColor: "#060440", borderRadius: 5, py: 3.5, mt: 5 }} variant="contained">
                Quiz speichern
            </Button>
            <Button onClick={() => append({ text: "", answers: Array.from({ length: 4 }, () => ({ text: "" })), correctAnswerIndex: 0 })} sx={{ width: 200, height: 50, backgroundColor: "#060440", borderRadius: 5, py: 3.5, mt: 5 }} variant="contained">
                Weitere Frage hinzufügen
            </Button>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="Frage erfolgreich gespeichert"
                key={vertical + horizontal} />
        </form>
    );
}

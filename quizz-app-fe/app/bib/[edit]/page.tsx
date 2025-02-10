'use client';
import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import axios from "axios";
import {useForm, useFieldArray, Controller} from "react-hook-form";
import {Input, RadioGroup, Radio} from "@heroui/react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    SnackbarOrigin
} from "@mui/material";
import {useUser} from "@/app/Context/UserContext";

interface Answer {
    answer: string;
    isCorrect: boolean;
}

interface Question {
    id?: number;
    question: string;
    answers: Answer[];
    correctAnswerIndex: number | null;
    status: string | null;
    creator?: string;
}

interface FormValues {
    quizQuestions: Question[];
}

const EditModulePage = () => {
    const {edit} = useParams();
    const moduleName = edit;
    const {userInfo} = useUser();

    const {register, control, handleSubmit, reset, getValues} =
        useForm<FormValues>({
            defaultValues: {quizQuestions: []},
        });

    const {fields} = useFieldArray({
        control,
        name: "quizQuestions",
    });

    useEffect(() => {
        if (moduleName) {
            axios
                .get(
                    `http://localhost:8080/quiz-app/resources/question-answer/modules/${moduleName}`,
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
                )
                .then((response) => {
                    const questions: Question[] = response.data.map((item: any) => ({
                        id: item.id,
                        question: item.question,
                        answers: item.answers.map((ans: any) => ({
                            answer: ans.answer,
                            isCorrect: ans.isCorrect,
                        })),
                        correctAnswerIndex: item.answers.findIndex((ans: any) => ans.isCorrect),
                        status: item.status,
                        creator: item.creator,
                    }));
                    reset({quizQuestions: questions});
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
        vertical: 'top',
        horizontal: 'center',
    });
    const {vertical, horizontal, open} = snackbarState;

    const handleClose = () => {
        setSnackbarState((prev) => ({...prev, open: false}));
    };

    const updateQuestionAnswer = async (questionIndex: number) => {
        const currentValues = getValues(`quizQuestions.${questionIndex}`);
        const payload = {
            id: currentValues.id,
            module: moduleName,
            question: currentValues.question,
            status: currentValues.status,
            answers: currentValues.answers.map((ans: Answer, index: number) => ({
                answer: ans.answer,
                isCorrect: currentValues.correctAnswerIndex === index,
            })),
        };
        try {
            console.log("Sending payload:", payload);
            await axios.put(
                "http://localhost:8080/quiz-app/resources/question-answer/",
                payload,
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
            console.log("Quiz updated successfully");
            setSnackbarState({
                open: true,
                vertical: 'bottom',
                horizontal: 'right',
            });
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    const onSubmit = async (data: FormValues) => {
        for (const [index, question] of data.quizQuestions.entries()) {
            const payload = {
                id: question.id,
                module: moduleName,
                question: question.question,
                status: question.status,
                answers: question.answers.map((ans, idx) => ({
                    answer: ans.answer,
                    isCorrect: question.correctAnswerIndex === idx,
                })),
            };
            try {
                console.log("Sending payload for question", index, payload);
                await axios.put(
                    "http://localhost:8080/quiz-app/resources/question-answer/",
                    payload,
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
                <h4 className="text-2xl text-seaBlue font-bold mb-3 text-center">
                    Fragen bearbeiten
                </h4>
                {fields.map((field, qIndex) => {
                    const isCreator = userInfo?.userName === field.creator;
                    return (
                        <div key={field.id} className="mb-3 w-full">
                            <Input
                                label={`Frage ${qIndex + 1}`}
                                {...register(`quizQuestions.${qIndex}.question` as const)}
                                className="mb-2 w-full"
                            />
                            <Controller
                                control={control}
                                name={`quizQuestions.${qIndex}.correctAnswerIndex`}
                                defaultValue={0}
                                render={({field: radioField}) => (
                                    <RadioGroup
                                        value={radioField.value}
                                        onValueChange={radioField.onChange}
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
                                                <Radio value={aIndex} label={`Antwort ${aIndex + 1}`}/>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            <FormControl fullWidth sx={{mt: 2}}>
                                <InputLabel>Status</InputLabel>
                                <Controller
                                    control={control}
                                    name={`quizQuestions.${qIndex}.status`}
                                    defaultValue={field.status || ""}
                                    render={({field: statusField}) => (
                                        <Select
                                            {...statusField}
                                            label="Status"
                                            variant="outlined"
                                            disabled={isCreator}
                                        >
                                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                                            <MenuItem value="REJECTED">REJECTED</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <div className="flex flex-row justify-center items-center w-full mb-3">
                                <Button
                                    type="button"
                                    onClick={() => updateQuestionAnswer(qIndex)}
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
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleClose}
                message="Frage erfolgreich gespeichert"
                key={vertical + horizontal}
            />
        </>
    );
};

export default EditModulePage;

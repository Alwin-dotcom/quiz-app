"use client";

import {useState} from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
} from "@mui/material";
import axios from "axios";

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    text: string;
    answers: Answer[];
    correctAnswerIndex: number;
}

export default function AddQuizModule() {
    const [moduleName, setModuleName] = useState("");
    const [creatorName, setCreatorName] = useState("");
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([{
        text: "",
        answers: Array(4).fill({text: "", isCorrect: false}),
        correctAnswerIndex: 0,
    },
    ]);

    const addQuestion = () => {
        setQuizQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                text: "",
                answers: Array(4).fill({text: "", isCorrect: false}),
                correctAnswerIndex: 0,
            },
        ]);
    };
    const updateQuestionText = (questionIndex: number, newText: string) => {
        const updatedQuestions = [...quizQuestions];
        updatedQuestions[questionIndex].text = newText;
        setQuizQuestions(updatedQuestions);
    };

    const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
        setQuizQuestions((prevQuestions) =>
            prevQuestions.map((question, qIndex) =>
                qIndex === questionIndex ? {...question, correctAnswerIndex: answerIndex} : question
            )
        );
    };

    const updateAnswerText = (
        questionIndex: number,
        answerIndex: number,
        newText: string
    ) => {
        setQuizQuestions((prevQuestions) =>
            prevQuestions.map((question, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.map((answer, aIndex) =>
                            aIndex === answerIndex ? {...answer, text: newText} : answer
                        ),
                    }
                    : question
            )
        );
    };

    const submitQuiz = async () => {
        const quizPayload = {
            moduleName,
            creator: creatorName,
            questions: quizQuestions.map((question) => ({
                questionText: question.text,
                answers: question.answers,
            })),
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/quiz-app/resources/question-answer",
                quizPayload
            );
            console.log("Quiz saved successfully:", response.data);
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    return (
        <Box
            className="shadow-md"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
                p: 3,
                borderRadius: 3,
                width: "60%",
                mx: "auto",
                backgroundColor: "#f9f9f9",
            }}
        >
            <Typography
                className="text-seaBlue"
                variant="h4"
                sx={{mb: 3}}
            >
                Fragen hinzufügen
            </Typography>

            <TextField
                label="Module Name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                sx={{mb: 3, width: "100%"}}
            />

            <TextField
                label="Creator Name"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                sx={{mb: 3, width: "100%"}}
            />

            {quizQuestions.map((question, questionIndex) => (
                <Box key={questionIndex} sx={{mb: 3, width: "100%"}}>
                    <TextField
                        label={`Question ${questionIndex + 1}`}
                        value={question.text}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                        sx={{mb: 2, width: "100%"}}
                    />

                    {question.answers.map((answer, answerIndex) => (
                        <Box
                            key={answerIndex}
                            sx={{display: "flex", alignItems: "center", mb: 1}}
                        >
                            <TextField
                                label={`Answer ${answerIndex + 1}`}
                                value={answer.text}
                                onChange={(e) =>
                                    updateAnswerText(questionIndex, answerIndex, e.target.value)
                                }
                                sx={{flex: 1, mr: 2}}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            question.correctAnswerIndex === answerIndex
                                        }
                                        onChange={() =>
                                            setCorrectAnswer(questionIndex, answerIndex)
                                        }
                                        color="secondary"
                                    />
                                }
                                label="Correct Answer"
                            />
                        </Box>
                    ))}
                </Box>
            ))}

            <Box className="flex flex-row justify-center items-center w-full mb-3">
                <Button
                    onClick={addQuestion}
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
                    Weitere Frage hinzufpügen
                </Button>
            </Box>

            <Box className="flex flex-row justify-center items-center w-full mb-3">
                <Button
                    onClick={submitQuiz}
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
            </Box>
        </Box>
    );
}
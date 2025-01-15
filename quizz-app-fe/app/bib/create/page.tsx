'use client';
import {useState} from "react";
import {Box, Button, TextField, Typography, Switch, FormControlLabel} from "@mui/material";
import axios from "axios";

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    questionText: string;
    answers: Answer[];
    correctAnswerIndex: number;
}

export default function AddModule() {
    const [moduleName, setModuleName] = useState("");
    const [creator, setCreator] = useState("");
    const [questions, setQuestions] = useState<Question[]>([
        {
            questionText: "",
            answers: Array(4).fill({text: "", isCorrect: false}),
            correctAnswerIndex: 0,
        },
    ]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: "",
                answers: Array(4).fill({text: "", isCorrect: false}),
                correctAnswerIndex: 0,
            },
        ]);
    };

    const handleChangeAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
        setQuestions(updatedQuestions);
    };

    const handleAnswerTextChange = (questionIndex: number, answerIndex: number, newText: string) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                answers: updatedQuestions[questionIndex].answers.map((answer, idx) =>
                    idx === answerIndex ? {...answer, text: newText} : answer
                ),
            };
            return updatedQuestions;
        });
    };


    const handleSubmit = async () => {
        const payload = {
            module: moduleName,
            creator: creator,
            question: questions.map((question) => ({
                question: question.questionText,
                answers: question.answers.map((answer) => ({
                    answer: answer.text,
                    isCorrect: answer.isCorrect,
                })),
            })),
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/quiz-app/resources/question-answer", payload
            );
            console.log("Erfolgreich gespeichert:", response.data);
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
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
                backgroundColor: "#f9f9f9"
            }}>
            <Typography className="text-seaBlue" variant="h4" sx={{mb: 3}}>
                Fragen hinzufügen
            </Typography>

            <TextField
                label="Modulname"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                sx={{mb: 3, width: "100%"}}
            />

            <TextField
                label="Ersteller"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                sx={{mb: 3, width: "100%"}}
            />

            {questions.map((question, questionIndex) => (
                <Box key={questionIndex} sx={{mb: 3, width: "100%"}}>
                    <TextField
                        label={`Frage ${questionIndex + 1}`}
                        value={question.questionText}
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[questionIndex].questionText = e.target.value;
                            setQuestions(updatedQuestions);
                        }}
                        sx={{mb: 2, width: "100%"}}
                    />

                    {question.answers.map((answer, aIndex) => (
                        <Box key={aIndex} sx={{display: "flex", alignItems: "center", mb: 1}}>
                            <TextField
                                label={`Antwort ${aIndex + 1}`}
                                value={answer.text}
                                onChange={(e) => handleAnswerTextChange(questionIndex, aIndex, e.target.value)}
                                sx={{flex: 1, mr: 2}}
                            />
                            <FormControlLabel
                                control={<Switch checked={question.correctAnswerIndex === aIndex}
                                                 onChange={() => handleChangeAnswer(questionIndex, aIndex)}
                                                 color="secondary"/>}
                                label="Richtige Antwort"
                            />
                        </Box>
                    ))}

                    <Box className="flex flex-row justify-center items-center w-full mb-3">
                        <Button
                            onClick={handleSubmit}
                            sx={{width: 200, height: 50, backgroundColor: "#060440", borderRadius: 5, py: 3.5, mt: 5}}
                            variant="contained"
                        >
                            Frage Speichern
                        </Button>
                    </Box>
                </Box>
            ))}

            <Box className="flex flex-row justify-center items-center w-full mb-3">
                <Button
                    onClick={handleAddQuestion}
                    sx={{width: 200, height: 50, backgroundColor: "#060440", borderRadius: 5, py: 3.5, mt: 5}}
                    variant="contained"
                >
                    Weitere Fragen hinzufügen
                </Button>
            </Box>

        </Box>
    );
}
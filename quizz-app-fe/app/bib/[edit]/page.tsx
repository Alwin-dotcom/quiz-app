'use client';
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
} from '@mui/material';

interface Answer {
    answer: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    answers: Answer[];
    correctAnswerIndex: number | null;
}

const EditModulePage = () => {
    const {edit} = useParams();
    const [moduleData, setModuleData] = useState<Question[]>([]);
    const [moduleName, setModuleName] = useState(edit || '');

    useEffect(() => {
        if (moduleName) {
            axios.get(`http://localhost:8080/quiz-app/resources/question-answer/modules/${moduleName}`, {
                withCredentials: true
            })
                .then(response => {
                    const questions: Question[] = response.data.map((item: any) => ({
                        id: item.id,
                        question: item.question,
                        answers: item.answers.map((answer: any) => ({
                            answer: answer.answer,
                            isCorrect: answer.isCorrect,
                        })),
                        correctAnswerIndex: item.answers.findIndex((answer: any) => answer.isCorrect),
                    }));
                    setModuleData(questions);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [moduleName]);

    const updateQuestionText = (questionIndex: number, newText: string) => {
        const updatedQuestions = [...moduleData];
        updatedQuestions[questionIndex].question = newText;
        setModuleData(updatedQuestions);
    };

    const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
        setModuleData(prevQuestions =>
            prevQuestions.map((question, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.map((answer, aIndex) =>
                            aIndex === answerIndex ? {...answer, isCorrect: true} : {...answer, isCorrect: false}
                        ),
                        correctAnswerIndex: answerIndex,
                    }
                    : question
            )
        );
    };

    const updateAnswerText = (questionIndex: number, answerIndex: number, newText: string) => {
        setModuleData((prevQuestions) =>
            prevQuestions.map((question, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.map((answer, aIndex) =>
                            aIndex === answerIndex ? {...answer, answer: newText} : answer
                        ),
                    }
                    : question
            )
        );
    };

    const submitQuiz = async (questionIndex: number) => {
        const currentQuestion = moduleData[questionIndex];

        const quizPayload = {
            module: moduleName,
            question: currentQuestion.question,
            answers: currentQuestion.answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isCorrect,
            })),
        };

        try {
            console.log('Sending payload:', JSON.stringify(quizPayload, null, 2));
            const response = await axios.put(
                `http://localhost:8080/quiz-app/resources/question-answer/modules/${moduleName}`,
                quizPayload
            );
            console.log('Quiz saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving quiz:', error);
        }
    };

    return (
        <Box
            className="shadow-md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 5,
                p: 3,
                borderRadius: 3,
                width: '60%',
                mx: 'auto',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Typography
                className="text-seaBlue"
                variant="h4"
                sx={{mb: 3}}
            >
                Fragen bearbeiten
            </Typography>

            {/* Fragen-Felder */}
            {moduleData.map((question, questionIndex) => (
                <Box key={questionIndex} sx={{mb: 3, width: '100%'}}>
                    <TextField
                        label={`Frage ${questionIndex + 1}`}
                        value={question.question}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                        sx={{mb: 2, width: '100%'}}
                    />

                    {/* Antwortfelder */}
                    {question.answers.map((answer, answerIndex) => (
                        <Box
                            key={answerIndex}
                            sx={{display: 'flex', alignItems: 'center', mb: 1}}
                        >
                            <TextField
                                label={`Antwort ${answerIndex + 1}`}
                                value={answer.answer}
                                onChange={(e) =>
                                    updateAnswerText(questionIndex, answerIndex, e.target.value)
                                }
                                sx={{flex: 1, mr: 2}}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={question.correctAnswerIndex === answerIndex}
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
                    {/* Speichern-Button */}
                    <Box className="flex flex-row justify-center items-center w-full mb-3">
                        <Button
                            onClick={() => submitQuiz(questionIndex)}
                            sx={{
                                width: 200,
                                height: 50,
                                backgroundColor: '#060440',
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
            ))}
        </Box>
    );
};

export default EditModulePage;
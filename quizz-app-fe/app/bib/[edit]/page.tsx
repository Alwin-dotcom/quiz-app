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
    MenuItem,
    Select,
    FormControl,
    InputLabel
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
    status: string | null;
}

const EditModulePage = () => {
    const {edit} = useParams();
    const [moduleData, setModuleData] = useState<Question[]>([]);
    const moduleName = edit;

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
                        status: item.status
                    }));
                    setModuleData(questions);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.error('Module name is not defined');
        }
    }, [moduleName]);

    const updateQuestionAnswer = async (questionIndex: number) => {
        const currentQuestion = moduleData[questionIndex];
        const quizPayload = {
            id: currentQuestion.id,
            module: moduleName,
            question: currentQuestion.question,
            answers: currentQuestion.answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isCorrect,
            })),
        };
        try {
            console.log('Sending payload:', JSON.stringify(quizPayload, null, 2));
            const response = await axios.put(`http://localhost:8080/quiz-app/resources/question-answer/`,
                quizPayload,
                {
                    withCredentials: true
                }
            );
            console.log('Quiz updated successfully:', response.data);
        } catch (error) {
            console.error('Error saving quiz:', error);
        }
    };

    const setStatus = async (questionIndex: number, newStatus: string) => {
        const currentQuestion = moduleData[questionIndex];
        const quizPayload = {
            id: currentQuestion.id,
            module: moduleName,
            question: currentQuestion.question,
            answers: currentQuestion.answers.map((answer) => ({
                answer: answer.answer,
                isCorrect: answer.isCorrect,
            })),
        };
        try {
            const response = await axios.post(`http://localhost:8080/quiz-app/resources/question-answer/${quizPayload.id}/${newStatus}`,
                quizPayload,
                {
                    withCredentials: true
                }
            );
            console.log(`Status updated successfully:`, response.data);
            setModuleData(prevQuestions => {
                return prevQuestions.map((question) => {
                    if (question.id === quizPayload.id) {
                        return {...question, status: newStatus};
                    } else {
                        return question;
                    }
                });
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const updateQuestionText = (questionIndex: number, newText: string) => {
        const updatedQuestions = [...moduleData];
        updatedQuestions[questionIndex].question = newText;
        setModuleData(updatedQuestions);
    };

    const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
        setModuleData(prevQuestions => {
            return prevQuestions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    return {
                        ...question,
                        answers: question.answers.map((answer, aIndex) => {
                            if (aIndex === answerIndex) {
                                return {...answer, isCorrect: true};
                            } else {
                                return {...answer, isCorrect: false};
                            }
                        }),
                        correctAnswerIndex: answerIndex,
                    };
                } else {
                    return question;
                }
            });
        });
    };

    const updateAnswerText = (questionIndex: number, answerIndex: number, newText: string) => {
        setModuleData(prevQuestions => {
            return prevQuestions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    return {
                        ...question,
                        answers: question.answers.map((answer, aIndex) => {
                            if (aIndex === answerIndex) {
                                return {...answer, answer: newText};
                            } else {
                                return answer;
                            }
                        }),
                    };
                } else {
                    return question;
                }
            });
        });
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
            {moduleData.map((question, questionIndex) => (
                <Box key={questionIndex} sx={{mb: 3, width: '100%'}}>
                    <TextField
                        label={`Frage ${questionIndex + 1}`}
                        value={question.question}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                        sx={{mb: 2, width: '100%'}}
                    />
                    {question.answers.map((answer, answerIndex) => (
                        <Box
                            key={answerIndex}
                            sx={{display: 'flex', alignItems: 'center', mb: 1}}
                        >
                            <TextField
                                label={`Antwort ${answerIndex + 1}`}
                                value={answer.answer}
                                onChange={(e) => updateAnswerText(questionIndex, answerIndex, e.target.value)}
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
                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={question.status || ''}
                            label="Status"
                            onChange={(e) => setStatus(questionIndex, e.target.value)}
                            variant="outlined">
                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                            <MenuItem value="REJECTED">REJECTED</MenuItem>
                            <MenuItem value="">None</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className="flex flex-row justify-center items-center w-full mb-3">
                        <Button
                            onClick={() => updateQuestionAnswer(questionIndex)}
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
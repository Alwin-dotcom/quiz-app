'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation'; // Verwende useRouter für dynamische Routen
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {useSearchParams} from "next/navigation";

interface Question {
    questionText: string;
    answers: { text: string; isCorrect: boolean }[];
}

const QuizPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const module = searchParams.get('module');
    console.log("Modul:", module);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        if (module) {
            axios.get(`http://localhost:8080/quiz-app/resources/question-answer/modules/${module}`)
                .then((response) => {
                    setQuestions(response.data);
                })
                .catch((error) => console.error('Error fetching questions:', error));
        }
    }, [module]);

    const handleAnswerClick = (index: number) => {
        if (isAnswerSelected) return;

        setSelectedAnswer(index);
        setIsAnswerSelected(true);

        if (questions[currentQuestionIndex].answers[index].isCorrect) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setIsAnswerSelected(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            router.push(`/quiz/${module}/result?score=${score}&total=${questions.length}`);
        }
    };

    if (!module) {
        console.log("Modul nicht gefunden", module);
    }

    if (questions.length === 0) {
        return <Typography>Fragen werden geladen...</Typography>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 600,
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    {currentQuestion.questionText}
                </Typography>
                <div className="mt-4">
                    {currentQuestion.answers.map((answer, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            color={
                                selectedAnswer === index
                                    ? answer.isCorrect
                                        ? 'success'
                                        : 'error'
                                    : 'primary'
                            }
                            sx={{
                                display: 'block',
                                width: '100%',
                                marginBottom: 2,
                            }}
                            onClick={() => handleAnswerClick(index)}
                            disabled={isAnswerSelected}
                        >
                            {answer.text}
                        </Button>
                    ))}
                </div>
            </Paper>
            {isAnswerSelected && (
                <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                    {currentQuestionIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
                </Button>
            )}
        </div>
    );
};

export default QuizPage;
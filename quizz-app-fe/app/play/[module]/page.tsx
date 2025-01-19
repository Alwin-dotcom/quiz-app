'use client';
import {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import axios from 'axios';

interface Answer {
    answer: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

const QuizPage = () => {
    const {module} = useParams();
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz-app/resources/question-answer/modules/${module}`
            );
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        if (module) {
            fetchQuestions();
        }
    }, [module]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            // Prüfen, ob die Antwort korrekt ist
            if (questions[currentQuestionIndex].answers[selectedAnswer].isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
        }
        // Zur nächsten Frage oder zur Ergebnisseite
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null); // Auswahl zurücksetzen
        } else {
            // Zur Ergebnisseite navigieren
            router.push(
                `/quiz/result?score=${
                    score +
                    (selectedAnswer !== null &&
                    questions[currentQuestionIndex].answers[selectedAnswer].isCorrect
                        ? 1
                        : 0)
                }&total=${questions.length}`
            );
        }
    };

    if (questions.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-xl">Fragen werden geladen...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen  p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Frage {currentQuestionIndex + 1} / {questions.length}
                </h1>
                <p className="text-lg text-gray-700 mb-6">{currentQuestion.question}</p>
                <div className="flex flex-col space-y-4">
                    {currentQuestion.answers.map((answer, index) => (
                        <label
                            key={index}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                                selectedAnswer === index
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'bg-gray-50 border-gray-300'
                            }`}
                        >
                            <input
                                type="radio"
                                checked={selectedAnswer === index}
                                onChange={() => handleAnswerSelect(index)}
                                className="mr-3"
                            />
                            {answer.answer}
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-semibold ${
                        selectedAnswer === null
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {currentQuestionIndex < questions.length - 1
                        ? 'Weiter'
                        : 'Ergebnis anzeigen'}
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
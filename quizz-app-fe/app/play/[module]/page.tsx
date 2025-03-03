'use client';
import {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Button} from "@mui/material";
import {useUser} from "@/app/Context/UserContext";
import api from '../../api';


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
    const [score, setScore] = useState<number>(0);

    const {userInfo} = useUser();

    const fetchQuestions = async () => {
        try {
            const response = await api.get(
                `/quiz-app/resources/question-answer/modules/${module}`,
                {
                    headers: {
                        Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                    },
                    withCredentials: true
                }
            );
            setQuestions(response.data);
            console.log("Response:", response.data);
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
        if (currentQuestion.answers[index].isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
        } else {
            postScore();
            router.push(`/play/${module}/${score}/${questions.length}`);
        }
    };

    const postScore = async () => {
        try {
            const ranksResponse = await api.get(
                "/quiz-app/resources/user/ranks",
                {
                    headers: {
                        Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                    }, withCredentials: true
                }
            );

            const ranksResponseData = ranksResponse.data;
            // eslint-disable-next-line
            const userRank = ranksResponseData.find((responseObject: any) => {
                return responseObject?.email === userInfo?.email && responseObject?.userName === userInfo?.userName;
            });

            let payload;

            if (userRank) {
                const newRank = userRank.rank + score;
                payload = {
                    id: userRank.id,
                    userName: userInfo?.userName,
                    email: userInfo?.email,
                    rank: newRank,
                };
            } else {
                payload = {
                    userName: userInfo?.userName,
                    email: userInfo?.email,
                    rank: score,
                };
            }

            const response = await api.post(
                "/quiz-app/resources/user/rank",
                payload,
                {

                    headers: {
                        Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                    }, withCredentials: true
                }
            );
            console.log("Score wurde gepostet. Response:", response);
        } catch (error) {
            console.error("Error posting score:", error);
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
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-white-100 shadow-lg rounded-lg w-full max-w-7xl p-6">
                <div className="bg-[#D9D9D9] rounded-lg p-4">
                    <h1 className="text-2xl text-center font-bold text-seaBlue mb-4">
                        Frage ({currentQuestionIndex + 1} / {questions.length})
                    </h1>
                    <p className="text-lg text-center text-seaBlue mb-6">
                        {currentQuestion.question}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-10">
                    {currentQuestion.answers.map((answer, index) => (
                        <label
                            key={index}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                                selectedAnswer === index
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'bg-[#D9D9D9] border-gray-300'
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
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={handleNextQuestion}
                        sx={{
                            width: 200,
                            height: 50,
                            backgroundColor: "#060440",
                            borderRadius: 5,
                            py: 3.5,
                        }}
                        variant="contained"
                    >
                        {currentQuestionIndex < questions.length - 1
                            ? 'Weiter'
                            : 'Ergebnis anzeigen'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;

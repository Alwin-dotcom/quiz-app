'use client';
import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import Typography from '@mui/material/Typography';

interface Question {
    questionText: string;
    answers: { text: string; isCorrect: boolean }[];
}

const QuizPage = () => {

    const {module} = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quiz-app/resources/question-answer/modules/${module}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (module) {
            fetchQuestions();
        }
    }, [module]);

    if (isLoading) {
        return <Typography>Fragen werden geladen...</Typography>;
    }

    return (
        <div style={{padding: '20px'}}>
            <pre style={{background: '#f4f4f4', padding: '10px', borderRadius: '8px'}}>
                {JSON.stringify(questions, null, 2)}
            </pre>
        </div>
    );
};

export default QuizPage;
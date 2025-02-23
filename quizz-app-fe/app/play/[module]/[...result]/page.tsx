'use client';
import {useParams} from "next/navigation";
import {Params} from "react-router";

const ResultPage = () => {

    const params: Params = useParams();
    const resultArray = params.result || [];
    const [score, total] = resultArray;

    if (!score || !total) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Kein Ergebnis verfügbar</h1>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Dein Ergebnis</h1>
            <p className="text-lg">
                Du hast {score} von {total} Fragen richtig beantwortet!
            </p>
        </div>
    );
};

export default ResultPage;
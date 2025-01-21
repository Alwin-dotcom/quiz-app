'use client';
import {useParams} from "next/navigation";

const page = () => {
    const {result} = useParams();


    if (!result) {
        return (
            <div>
                <h1>Kein Ergebnis</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Dein Ergebnis</h1>
            <p>Du hast{result}/10 Fragen richtig beantwortet</p>
        </div>
    );
};

export default page
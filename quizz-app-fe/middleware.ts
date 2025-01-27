import {NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token'); // Prüfe das Token aus den Cookies

    if (!token) {
        // Kein Token -> Leite zur Login-Seite weiter
        return NextResponse.redirect('http://localhost:8080/quiz-app/resources/question-answer');
    }

    return NextResponse.next(); // Zulasse, wenn Token existiert
}

export const config = {
    matcher: ['/api/:path*', '/protected/:path*'], // Nur für bestimmte Pfade anwenden
};
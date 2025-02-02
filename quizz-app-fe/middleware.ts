import {NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token');
    if (!token) {

        return NextResponse.redirect('http://localhost:8080/quiz-app/resources/question-answer');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/protected/:path*'],
};
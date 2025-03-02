// next.config.js
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {

    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                env: {
                    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
                },
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'http://localhost:3000',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, DELETE, PATCH, POST, PUT, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];


    },
};

module.exports = nextConfig;
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_API_URL: "https://backend.icyrock-507037c6.germanywestcentral.azurecontainerapps.io",
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, DELETE, PATCH, POST, PUT, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

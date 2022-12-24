/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true
	},
	experimental: {
		appDir: true
	},
	webpack: config => {
		// Tree shake barrel files
		config.module.rules.push({
			test: [
				/src\/.*index.ts/i,
			],
			sideEffects: false,
		});

		return config;
	},
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{
					key: "X-Frame-Options",
					value: "SAMEORIGIN"
				},
				{
					key: "X-XSS-Protection",
					value: "1; mode=block"
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff"
				},
				{
					key: "Referrer-Policy",
					value: "same-origin"
				},
				{
					key: "Permissions-Policy",
					value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
				}
			]
		}
	]
}

module.exports = nextConfig

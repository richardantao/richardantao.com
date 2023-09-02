const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: "export",
	eslint: {
		ignoreDuringBuilds: true,
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
	}
}

module.exports = withBundleAnalyzer(nextConfig);

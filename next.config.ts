import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	cacheComponents: true,
	skipTrailingSlashRedirect: true,
	reactCompiler: true,
	experimental: {
		viewTransition: true,
	},
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/array/:path*",
				destination: "https://us-assets.i.posthog.com/array/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
		];
	},
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{
					key: "X-Frame-Options",
					value: "SAMEORIGIN",
				},
				{
					key: "X-XSS-Protection",
					value: "1; mode=block",
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff",
				},
				{
					key: "Referrer-Policy",
					value: "same-origin",
				},
				{
					key: "Permissions-Policy",
					value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
				},
			],
		},
	],
};

const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
	},
});

export default withMDX(nextConfig);

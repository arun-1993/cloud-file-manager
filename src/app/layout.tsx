import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import PostHogProvider from "./_providers/posthog-provider";

export const metadata: Metadata = {
	title: "Cloudy File Manager",
	description: "Just like Google Drive, but worse in every way! 😅",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${GeistSans.variable}`}>
				<PostHogProvider>
					<body>{children}</body>
				</PostHogProvider>
			</html>
		</ClerkProvider>
	);
}

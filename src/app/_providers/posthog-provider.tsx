"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "~/env";
import SuspendedPostHogPageView from "./pageview-tracker";

export default function PostHogProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	useEffect(() => {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
			api_host: "/ingest",
			ui_host: "<ph_app_host>",
			person_profiles: "always",
		});
	}, []);

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}

// ui_host: "https://us.i.posthog.com"
// ui_host: "<ph_app_host>"

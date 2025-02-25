"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

function PostHogPageView() {
	const pathname = usePathname();
	const posthog = usePostHog();
	const searchParams = useSearchParams();
	const user = useUser();

	// Track user
	useEffect(() => {
		if (user.user?.id) {
			posthog.identify(user.user.id, {
				email: user.user.emailAddresses[0]?.emailAddress,
			});
		} else {
			posthog.reset();
		}
	}, [posthog, user.user]);

	// Track pageviews
	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname;

			if (searchParams.toString()) {
				url += "?" + searchParams.toString();
			}

			posthog.capture("$pageview", { $current_url: url });
		}
	}, [pathname, posthog, searchParams]);

	return null;
}

// Wrap this in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	);
}

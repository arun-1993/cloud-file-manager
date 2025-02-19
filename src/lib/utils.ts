import { clsx, type ClassValue } from "clsx";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function devOnly() {
	if (process.env.NODE_ENV !== "development") {
		return notFound();
	}
}

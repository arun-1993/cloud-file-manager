import { eq } from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable } from "./schema";

export async function getFiles(folderId: number) {
	return db
		.select()
		.from(filesTable)
		.where(eq(filesTable.parent, folderId))
		.orderBy(filesTable.name);
}

export async function getFolders(folderId: number) {
	return db
		.select()
		.from(foldersTable)
		.where(eq(foldersTable.parent, folderId))
		.orderBy(foldersTable.name);
}

export async function getParents(folderId: number) {
	const parents = [];
	let currentId: number | null = folderId;

	while (currentId !== null) {
		const folder = await db
			.select()
			.from(foldersTable)
			.where(eq(foldersTable.id, currentId));

		if (folder[0]) {
			parents.unshift(folder[0]);
			currentId = folder[0]?.parent;
		}
	}

	return parents;
}

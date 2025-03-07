import { eq } from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable, type DbFileType } from "./schema";

export const create = {
	file: async (input: {
		file: Omit<DbFileType, "id" | "ownerId" | "createdAt" | "updatedAt">;
		userId: string;
	}) => {
		return await db
			.insert(filesTable)
			.values({ ...input.file, ownerId: input.userId });
	},
};

export const read = {
	files: async (folderId: number) => {
		return db
			.select()
			.from(filesTable)
			.where(eq(filesTable.parent, folderId))
			.orderBy(filesTable.name);
	},

	folders: async (folderId: number) => {
		return db
			.select()
			.from(foldersTable)
			.where(eq(foldersTable.parent, folderId))
			.orderBy(foldersTable.name);
	},

	folder: async (folderId: number) => {
		const folder = await db
			.select()
			.from(foldersTable)
			.where(eq(foldersTable.id, folderId));
		return folder[0];
	},

	parents: async (folderId: number) => {
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
	},
};

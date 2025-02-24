import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFolders } from "~/lib/mock-data";
import { devOnly } from "~/lib/utils";
import { db } from "~/server/db";
import { foldersTable } from "~/server/db/schema";

export default async function SandboxPage() {
	devOnly();

	const user = await auth();

	if (!user.userId) throw new Error("User not found!");

	const folders = await db
		.select()
		.from(foldersTable)
		.where(eq(foldersTable.ownerId, user.userId))
		.orderBy(foldersTable.name);

	console.log(folders);

	return (
		<div className="flex flex-col gap-4">
			Seed function
			<form
				action={async () => {
					"use server";

					const user = await auth();

					if (!user.userId) throw new Error("User not found!");

					const foldersDelete = await db
						.delete(foldersTable)
						.where(eq(foldersTable.ownerId, user.userId));

					const rootFolder = await db
						.insert(foldersTable)
						.values({
							name: "root",
							ownerId: user.userId,
							parent: null,
						})
						.$returningId();

					const folders = mockFolders
						.filter((folder) => folder.name !== "Root")
						.map((folder) => ({
							name: folder.name,
							ownerId: user.userId,
							parent: rootFolder[0]?.id,
						}));

					const foldersInsert = await db
						.insert(foldersTable)
						.values(folders);

					// eslint-disable-next-line drizzle/enforce-delete-with-where
					// const filesDelete = await db
					// 	.delete(filesTable)
					// 	.where(eq(foldersTable.ownerId, user.userId));

					// const files = mockFiles.map((file) => ({
					// 	name: file.name,
					// 	ownerId: user.userId,
					// 	parent: rootFolder[0]?.id,
					// 	size: file.size,
					// 	url: file.url,
					// }));

					// const filesInsert = await db
					// 	.insert(filesTable)
					// 	.values(files);

					console.log({
						"Folders deletion": foldersDelete,
						"Folders insertion": foldersInsert,
						// "Files deletion": filesDelete,
						// "Files insertion": filesInsert,
					});
				}}
			>
				<button type="submit">Seed</button>
			</form>
		</div>
	);
}

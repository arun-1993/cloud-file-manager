import { mockFiles, mockFolders } from "~/lib/mock-data";
import { devOnly } from "~/lib/utils";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";

export default function SandboxPage() {
	devOnly();

	return (
		<div className="flex flex-col gap-4">
			Seed function
			<form
				action={async () => {
					"use server";

					// eslint-disable-next-line drizzle/enforce-delete-with-where
					const foldersDelete = await db.delete(foldersTable);
					const foldersInsert = await db
						.insert(foldersTable)
						.values(mockFolders);

					// eslint-disable-next-line drizzle/enforce-delete-with-where
					const filesDelete = await db.delete(filesTable);
					const filesInsert = await db
						.insert(filesTable)
						.values(mockFiles);

					console.log({
						"Folders deletion": foldersDelete,
						"Folders insertion": foldersInsert,
						"Files deletion": filesDelete,
						"Files insertion": filesInsert,
					});
				}}
			>
				<button type="submit">Seed</button>
			</form>
		</div>
	);
}

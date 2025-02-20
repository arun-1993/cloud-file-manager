import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import {
	files as filesSchema,
	folders as foldersSchema,
} from "~/server/db/schema";

async function getParents(folderId: number) {
	const parents = [];
	let currentId: number | null = folderId;

	while (currentId !== null) {
		const folder = await db
			.select()
			.from(foldersSchema)
			.where(eq(foldersSchema.id, currentId));

		if (folder[0]) {
			parents.unshift(folder[0]);
			currentId = folder[0]?.parent;
		}
	}

	return parents;
}

export default async function DrivePage(props: {
	params: Promise<{ folderId: string }>;
}) {
	const folderId = Number((await props.params).folderId);

	if (isNaN(folderId)) return <div>Invalid folderId</div>;

	const filesFetch = db
		.select()
		.from(filesSchema)
		.where(eq(filesSchema.parent, folderId))
		.orderBy(filesSchema.name);

	const foldersFetch = db
		.select()
		.from(foldersSchema)
		.where(eq(foldersSchema.parent, folderId))
		.orderBy(foldersSchema.name);

	const parentsFetch = getParents(folderId);

	const [files, folders, parents] = await Promise.all([
		filesFetch,
		foldersFetch,
		parentsFetch,
	]);

	return <DriveContents files={files} folders={folders} parents={parents} />;
}

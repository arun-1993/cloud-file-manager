import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import {
	files as filesSchema,
	folders as foldersSchema,
} from "~/server/db/schema";

export default async function DrivePage(props: {
	params: Promise<{ folderId: string }>;
}) {
	const folderId = Number((await props.params).folderId);

	if (isNaN(folderId)) return <div>Invalid folderId</div>;

	const files = await db
		.select()
		.from(filesSchema)
		.where(eq(filesSchema.parent, folderId))
		.orderBy(filesSchema.name);
	const folders = await db
		.select()
		.from(foldersSchema)
		.where(eq(foldersSchema.parent, folderId))
		.orderBy(foldersSchema.name);

	console.log(folderId);

	return <DriveContents files={files} folders={folders} />;
}

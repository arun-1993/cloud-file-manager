import { db } from "~/server/db";
import {
	files as filesSchema,
	folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";

export default async function DrivePage() {
	const files = await db.select().from(filesSchema).orderBy(filesSchema.id);
	const folders = await db
		.select()
		.from(foldersSchema)
		.orderBy(foldersSchema.id);

	return <DriveContents files={files} folders={folders} />;
}

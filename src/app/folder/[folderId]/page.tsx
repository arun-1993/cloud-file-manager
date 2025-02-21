import DriveContents from "~/app/drive-contents";
import { getFiles, getFolders, getParents } from "~/server/db/queries";

export default async function DrivePage(props: {
	params: Promise<{ folderId: string }>;
}) {
	const folderId = Number((await props.params).folderId);

	if (isNaN(folderId)) return <div>Invalid folderId</div>;

	const [files, folders, parents] = await Promise.all([
		getFiles(folderId),
		getFolders(folderId),
		getParents(folderId),
	]);

	return <DriveContents files={files} folders={folders} parents={parents} />;
}

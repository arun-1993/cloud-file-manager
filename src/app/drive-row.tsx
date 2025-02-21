import { FileIcon, Folder as FolderIcon } from "lucide-react";
import Link from "next/link";
import type { filesTable, foldersTable } from "~/server/db/schema";

export function FileRow(props: { file: typeof filesTable.$inferSelect }) {
	const { file } = props;

	const getFileSize = () => {
		const units = ["B", "KB", "MB", "GB"];
		let size = file.size;

		for (const unit of units) {
			if (size < 1024) return `${Math.round(size * 100) / 100} ${unit}`;
			size /= 1024;
		}

		return `${size} GB`;
	};

	return (
		<li
			key={file.id}
			className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
		>
			<div className="grid grid-cols-12 items-center gap-4">
				<div className="col-span-6 flex items-center">
					<Link
						href={file.url}
						className="flex items-center text-gray-100 hover:text-blue-400"
						target="_blank"
					>
						<FileIcon className="mr-3" size={20} />
						{file.name}
					</Link>
				</div>
				<div className="col-span-3 text-gray-400">File</div>
				<div className="col-span-3 text-gray-400">{getFileSize()}</div>
			</div>
		</li>
	);
}

export function FolderRow(props: { folder: typeof foldersTable.$inferSelect }) {
	const { folder } = props;

	return (
		<li
			key={folder.id}
			className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
		>
			<div className="grid grid-cols-12 items-center gap-4">
				<div className="col-span-6 flex items-center">
					<Link
						href={`/folder/${folder.id}`}
						className="flex items-center text-gray-100 hover:text-blue-400"
					>
						<FolderIcon className="mr-3" size={20} />
						{folder.name}
					</Link>
				</div>

				<div className="col-span-3 text-gray-400">Folder</div>

				<div className="col-span-3 text-gray-400">--</div>
			</div>
		</li>
	);
}

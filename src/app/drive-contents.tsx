"use client";

import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { files, folders } from "~/server/db/schema";
import { FileRow, FolderRow } from "./drive-row";

export default function DriveContents(props: {
	files: (typeof files.$inferSelect)[];
	folders: (typeof folders.$inferSelect)[];
	parents: (typeof folders.$inferSelect)[];
}) {
	const { files, folders, parents } = props;

	const handleUpload = () => {
		alert("Upload functionality would be implemented here");
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8 text-gray-100">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center">
						<Link
							href={`/folder/${parents[0]?.id}`}
							className="mr-2 text-gray-300 hover:text-gray-700"
						>
							My Drive
						</Link>
						{parents.map(
							(folder, i) =>
								i > 0 && (
									<div
										key={folder.id}
										className="flex items-center"
									>
										<ChevronRight
											className="mx-2 text-gray-500"
											size={16}
										/>
										<Link
											href={`/folder/${folder.id}`}
											className="text-gray-300 hover:text-gray-700"
										>
											{folder.name}
										</Link>
									</div>
								),
						)}
					</div>
					<Button
						onClick={handleUpload}
						className="bg-blue-600 text-white hover:bg-blue-700"
					>
						<Upload className="mr-2" size={20} />
						Upload
					</Button>
				</div>
				<div className="rounded-lg bg-gray-800 shadow-xl">
					<div className="border-b border-gray-700 px-6 py-4">
						<div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
							<div className="col-span-6">Name</div>
							<div className="col-span-3">Type</div>
							<div className="col-span-3">Size</div>
						</div>
					</div>
					<ul>
						{folders.map((folder) => (
							<FolderRow folder={folder} key={folder.id} />
						))}

						{files.map((file) => (
							<FileRow file={file} key={file.id} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

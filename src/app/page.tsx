"use client";

import { ChevronRight, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { mockFiles, mockFolders } from "../lib/mock-data";
import { FileRow, FolderRow } from "./drive-row";

export default function GoogleDriveClone() {
	const [currentFolder, setCurrentFolder] = useState("0");

	const breadcrumbs = useMemo(() => {
		const breadcrumbs = [];
		let currentId = currentFolder;

		while (currentId !== "0") {
			const folder = mockFolders.find(
				(folder) => folder.id === currentId,
			);
			if (folder) {
				breadcrumbs.unshift(folder);
				currentId = folder.parent ?? "0";
			} else {
				break;
			}
		}

		return breadcrumbs;
	}, [currentFolder]);

	const getCurrentFiles = () => {
		return mockFiles.filter((file) => file.parent === currentFolder);
	};

	const getCurrentFolders = () => {
		return mockFolders.filter((folder) => folder.parent === currentFolder);
	};

	const handleFolderClick = (folderId: string) => {
		setCurrentFolder(folderId);
	};

	const handleUpload = () => {
		alert("Upload functionality would be implemented here");
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8 text-gray-100">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center">
						<Button
							onClick={() => setCurrentFolder("0")}
							variant="ghost"
							className="mr-2 text-gray-300 hover:text-gray-700"
						>
							My Drive
						</Button>
						{breadcrumbs.map((folder, _index) => (
							<div key={folder.id} className="flex items-center">
								<ChevronRight
									className="mx-2 text-gray-500"
									size={16}
								/>
								<Button
									onClick={() => handleFolderClick(folder.id)}
									variant="ghost"
									className="text-gray-300 hover:text-gray-700"
								>
									{folder.name}
								</Button>
							</div>
						))}
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
						{getCurrentFolders().map((folder) => (
							<FolderRow
								folder={folder}
								handleFolderClick={() =>
									handleFolderClick(folder.id)
								}
								key={folder.id}
							/>
						))}

						{getCurrentFiles().map((file) => (
							<FileRow file={file} key={file.id} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

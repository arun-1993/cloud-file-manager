export type File = {
	id: number;
	name: string;
	parent: number;
	size: number;
	url: string;
};

export type Folder = {
	id: number;
	name: string;
	parent: number | null;
};

export const mockFiles: File[] = [
	{
		id: 5,
		name: "Resume.pdf",
		parent: 2,
		size: 1258291,
		url: "/files/resume.pdf",
	},
	{
		id: 6,
		name: "Project Proposal.docx",
		parent: 2,
		size: 2621440,
		url: "/files/proposal.docx",
	},
	{
		id: 7,
		name: "Vacation.jpg",
		parent: 3,
		size: 3879731,
		url: "/files/vacation.jpg",
	},
	{
		id: 8,
		name: "Profile Picture.png",
		parent: 3,
		size: 1887436,
		url: "/files/profile.png",
	},

	{
		id: 10,
		name: "Q4 Report.pptx",
		parent: 9,
		size: 5452595,
		url: "/files/q4-report.pptx",
	},
	{
		id: 11,
		name: "Budget.xlsx",
		parent: 4,
		size: 1572864,
		url: "/files/budget.xlsx",
	},
];

export const mockFolders: Folder[] = [
	{ id: 1, name: "Root", parent: null },
	{ id: 2, name: "Documents", parent: 1 },
	{ id: 3, name: "Images", parent: 1 },
	{ id: 4, name: "Work", parent: 1 },
	{ id: 9, name: "Presentations", parent: 4 },
];

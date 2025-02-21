import {
	bigint,
	index,
	singlestoreTableCreator,
	text,
	tinyint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
	(name) => `cloud-file-manager_${name}`,
);

export const filesTable = createTable(
	"files",
	{
		id: bigint("id", { mode: "number", unsigned: true })
			.primaryKey()
			.autoincrement(),
		name: text("name").notNull(),
		parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
		size: bigint("size", { mode: "number", unsigned: true }).notNull(),
		url: text("url").notNull(),
	},
	(table) => [index("parent_index").on(table.parent)],
);

export const foldersTable = createTable(
	"folders",
	{
		id: bigint("id", { mode: "number", unsigned: true })
			.notNull()
			.primaryKey()
			.autoincrement(),
		name: text("name").notNull(),
		parent: bigint("parent", { mode: "number", unsigned: true }),
	},
	(table) => [index("parent_index").on(table.parent)],
);

export const usersTable = createTable("users", {
	id: bigint("id", { mode: "number", unsigned: true })
		.primaryKey()
		.autoincrement(),
	name: text("name"),
	age: tinyint("age"),
});

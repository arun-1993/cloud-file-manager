import {
	bigint,
	index,
	singlestoreTableCreator,
	text,
	timestamp,
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
		ownerId: text("ownerId").notNull(),
		parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
		size: bigint("size", { mode: "number", unsigned: true }).notNull(),
		url: text("url").notNull(),
		createdAt: timestamp("createdAt").defaultNow().notNull(),
		updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
	},
	(table) => [
		index("ownerIndex").on(table.ownerId),
		index("parentIndex").on(table.parent),
	],
);

export type DbFileType = typeof filesTable.$inferSelect;

export const foldersTable = createTable(
	"folders",
	{
		id: bigint("id", { mode: "number", unsigned: true })
			.primaryKey()
			.autoincrement(),
		name: text("name").notNull(),
		ownerId: text("ownerId").notNull(),
		parent: bigint("parent", { mode: "number", unsigned: true }),
		createdAt: timestamp("createdAt").defaultNow().notNull(),
		updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
	},
	(table) => [
		index("ownerIndex").on(table.ownerId),
		index("parentIndex").on(table.parent),
	],
);

export type DbFolderType = typeof foldersTable.$inferSelect;

export const usersTable = createTable("users", {
	id: bigint("id", { mode: "number", unsigned: true })
		.primaryKey()
		.autoincrement(),
	name: text("name"),
	age: tinyint("age"),
});

export type DbUserType = typeof usersTable.$inferSelect;

import { type Config } from "drizzle-kit";

import { env } from "~/env";

const config = {
	schema: "./src/server/db/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	tablesFilter: ["cloud-file-manager_*"],
} satisfies Config;

export default config;

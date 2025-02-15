import { defineConfig, type Config } from "drizzle-kit";
import { env } from "~/env";

const config = defineConfig({
	schema: "./src/server/db/schema.ts",
	dialect: "singlestore",
	tablesFilter: ["cloud-file-manager_*"],
	dbCredentials: {
		host: env.SINGLESTORE_HOST,
		port: parseInt(env.SINGLESTORE_PORT),
		user: env.SINGLESTORE_USER,
		password: env.SINGLESTORE_PASS,
		database: env.SINGLESTORE_DB,
		ssl: {},
	},
} satisfies Config);

export default config;

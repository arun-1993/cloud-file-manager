/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
	plugins: ["prettier-plugin-tailwindcss"],
	tabWidth: 4,
	useTabs: true,
	overrides: [
		{
			files: "*.yaml",
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};

export default config;

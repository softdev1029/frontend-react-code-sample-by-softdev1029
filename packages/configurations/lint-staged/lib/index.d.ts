declare const config: {
	"*.{js,jsx,ts,tsx}": (stagedFiles: string[]) => Promise<string>;
	"*.{css,gql,graphql,html,js,json,jsx,md,mdx,sh,ts,tsx,yml}": string;
};
export default config;

export {};

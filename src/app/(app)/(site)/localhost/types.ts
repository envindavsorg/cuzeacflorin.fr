export type Port = {
	number: number;
	description: string;
	color: string;
	isActive?: boolean;
};

// biome-ignore lint/style/noEnum: needed here
export enum SearchEngine {
	Google = 'Google',
	DuckDuckGo = 'DuckDuckGo',
	Bing = 'Bing',
	Brave = 'Brave',
}

export type SearchEngineOption = {
	name: SearchEngine;
	url: string;
};

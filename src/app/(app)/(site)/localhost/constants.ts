import type { Port, SearchEngineOption } from './types';
import { SearchEngine } from './types';

export const INITIAL_FAVORITE_PORTS: Port[] = [
	{
		number: 5000,
		description: 'Site WeFix',
		color: 'outline-orange-600 dark:outline-orange-300',
	},
	{
		number: 5001,
		description: 'WeFix - Espace client',
		color: 'outline-blue-600 dark:outline-blue-300',
	},
	{
		number: 5002,
		description: 'WeFix - B2B',
		color: 'outline-pink-600 dark:outline-pink-300',
	},
	{
		number: 5003,
		description: 'WeFix - Assurances',
		color: 'outline-yellow-600 dark:outline-yellow-300',
	},
	{
		number: 5004,
		description: 'WeFix - Partenaires',
		color: 'outline-teal-600 dark:outline-teal-300',
	},
	{
		number: 5005,
		description: 'WeFix - Bannières',
		color: 'outline-stone-600 dark:outline-stone-300',
	},
];

export const SEARCH_ENGINES: SearchEngineOption[] = [
	{ name: SearchEngine.Google, url: 'https://www.google.com/search?q=' },
	{ name: SearchEngine.DuckDuckGo, url: 'https://duckduckgo.com/?q=' },
	{ name: SearchEngine.Bing, url: 'https://www.bing.com/search?q=' },
	{ name: SearchEngine.Brave, url: 'https://search.brave.com/search?q=' },
];

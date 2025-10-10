export type PostMetadata = {
	title: string;
	description: string;
	imageDark?: string;
	imageLight?: string;
	category?: string;
	createdAt: string;
	updatedAt: string;
	tags?: string[];
	author?: string;
	new?: boolean;
};

export type Post = {
	metadata: PostMetadata;
	slug: string;
	content: string;
	reading?: {
		time: string;
		words: number;
	};
};

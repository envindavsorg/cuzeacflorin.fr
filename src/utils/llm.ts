const getPrompt = (url: string, isComponent?: boolean) => {
	if (isComponent) {
		return `
I'm looking at this component documentation: ${url}.

I want to use it in an React (TypeScript) and eventually Next.js project.

Help me understand how to use it step-by-step, including explaining key concepts,
showing practical examples with TypeScript code, and pointing out common pitfalls.

Be ready to answer follow-up questions and help debug issues based on the documentation.
`;
	}

	return `Read ${url}, i want to ask questions about it.`;
};

export default getPrompt;

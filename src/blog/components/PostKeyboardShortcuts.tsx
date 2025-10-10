'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';
import type { Post } from '../types/post';

type PostKeyboardShortcutsProps = {
	basePath: string;
	previous: Post | null;
	next: Post | null;
};

export const PostKeyboardShortcuts = ({
	basePath,
	previous,
	next,
}: PostKeyboardShortcutsProps): React.JSX.Element | null => {
	const router = useRouter();

	const navigate = (post: Post | null) => {
		if (post) {
			router.push(`${basePath}/${post.slug}`);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		document.addEventListener(
			'keydown',
			(event: KeyboardEvent) => {
				if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
					if (
						(event.target instanceof HTMLElement &&
							event.target.isContentEditable) ||
						event.target instanceof HTMLInputElement ||
						event.target instanceof HTMLTextAreaElement ||
						event.target instanceof HTMLSelectElement
					) {
						return;
					}

					event.preventDefault();

					if (event.key === 'ArrowRight') {
						navigate(next);
					} else {
						navigate(previous);
					}
				}
			},
			{ signal }
		);

		return () => abortController.abort();
	}, [navigate, next, previous]);

	return null;
};

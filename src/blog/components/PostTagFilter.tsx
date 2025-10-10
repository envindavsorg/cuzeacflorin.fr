'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
} from '../../components/ui/Drawer';
import { cn } from '../../lib/utils';

type PostTagFilterProps = {
	tags: string[];
	selectedTag: string;
	tagCounts?: Record<string, number>;
};

export const PostTagFilter = ({
	tags,
	selectedTag,
	tagCounts,
}: PostTagFilterProps): React.JSX.Element => {
	const router = useRouter();
	const pathname = usePathname();

	const handleTagClick = (tag: string) => {
		const params = new URLSearchParams();
		if (tag !== 'Tous les articles') {
			params.set('tag', tag);
		}
		if (tag !== 'Tous les composants') {
			params.set('tag', tag);
		}
		router.push(`${pathname}?${params.toString()}`);
	};

	const DesktopTagFilter = () => (
		<div className="hidden flex-wrap gap-2 md:flex">
			{tags.map((tag) => (
				<button
					className={cn(
						'flex h-8 cursor-pointer items-center rounded-lg border border-input px-2 pl-2 text-sm transition-colors',
						selectedTag === tag
							? 'border-theme text-theme'
							: 'border-input bg-background'
					)}
					key={tag}
					onClick={() => handleTagClick(tag)}
					type="button"
				>
					<span>{tag}</span>
					{tagCounts?.[tag] && (
						<span
							className={cn(
								'ml-2 flex h-5 min-w-5 items-center justify-center rounded-md border font-medium text-xs',
								selectedTag === tag
									? 'border-theme bg-background text-theme'
									: 'border-input'
							)}
						>
							{tagCounts[tag]}
						</span>
					)}
				</button>
			))}
		</div>
	);

	const MobileTagFilter = () => (
		<Drawer>
			<DrawerTrigger className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-2 transition-colors hover:bg-muted md:hidden">
				<span className="font-medium text-sm">{selectedTag}</span>
				<CaretDownIcon className="size-4" />
			</DrawerTrigger>

			<DrawerContent className="md:hidden">
				<DrawerHeader>
					<h3 className="font-semibold text-base">Filtrer par catégorie :</h3>
				</DrawerHeader>

				<DrawerBody>
					<div className="space-y-3">
						{tags.map((tag: string) => (
							<button
								className="flex w-full cursor-pointer items-center justify-between font-medium text-sm transition-colors"
								key={tag}
								onClick={() => handleTagClick(tag)}
								type="button"
							>
								<span
									className={`flex w-full cursor-pointer items-center justify-between font-medium text-base transition-colors ${
										selectedTag === tag
											? 'text-theme underline underline-offset-4'
											: 'text-muted-foreground'
									}`}
								>
									{tag}
								</span>
								{tagCounts?.[tag] && (
									<span className="ml-2 flex h-6 min-w-6 flex-shrink-0 items-center justify-center rounded-md border border-input">
										{tagCounts[tag]}
									</span>
								)}
							</button>
						))}
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);

	return (
		<>
			<DesktopTagFilter />
			<MobileTagFilter />
		</>
	);
};

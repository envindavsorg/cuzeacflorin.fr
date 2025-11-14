'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { capitalize } from 'es-toolkit/string';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
} from '@/components/ui/Drawer';
import { cn } from '@/lib/utils';

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
		const params: URLSearchParams = new URLSearchParams(window.location.search);

		if (tag === 'Tout') {
			params.delete('tag');
		} else {
			params.set('tag', tag.toLowerCase());
		}

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	};

	const DesktopTagFilter = () => (
		<div className="screen-line-after hidden flex-wrap gap-x-4 px-3 py-1.5 md:flex">
			{tags.map((tag: string) => {
				const isActive =
					tag === 'Tout'
						? selectedTag === 'Tout'
						: selectedTag === tag.toLowerCase();

				return (
					<div className="flex items-center gap-x-1.5" key={tag}>
						<Button
							className={cn(
								'px-0',
								isActive
									? 'text-theme underline underline-offset-4'
									: 'text-foreground'
							)}
							onClick={() => handleTagClick(tag)}
							variant="link"
						>
							{tag}
						</Button>
						{tagCounts?.[tag] && (
							<sup
								className={cn(
									'font-medium text-[10px]',
									isActive ? 'text-theme' : 'text-foreground'
								)}
							>
								{tagCounts[tag]}
							</sup>
						)}
					</div>
				);
			})}
		</div>
	);

	const MobileTagFilter = () => (
		<Drawer>
			<DrawerTrigger className="screen-line-after flex size-full items-center justify-between p-3 md:hidden">
				<span className="font-medium text-sm">
					Catégorie: {capitalize(selectedTag)}
				</span>
				<CaretDownIcon className="size-4" />
			</DrawerTrigger>

			<DrawerContent className="md:hidden">
				<DrawerHeader>
					<h3 className="font-semibold text-base">Filtrer par catégorie :</h3>
				</DrawerHeader>

				<DrawerBody>
					<div className="space-y-3">
						{tags.map((tag: string) => {
							const isActive =
								tag === 'Tout'
									? selectedTag === 'Tout'
									: selectedTag === tag.toLowerCase();

							return (
								<div className="flex items-center justify-between" key={tag}>
									<Button
										className={cn(
											'px-0 font-medium text-base',
											isActive
												? 'text-theme underline underline-offset-4'
												: 'text-foreground'
										)}
										onClick={() => handleTagClick(tag)}
										variant="link"
									>
										{tag}
									</Button>
									{tagCounts?.[tag] && (
										<Badge
											className={cn(
												'aspect-square border',
												isActive
													? 'border-theme text-theme'
													: 'border-input text-foreground'
											)}
										>
											{tagCounts[tag]}
										</Badge>
									)}
								</div>
							);
						})}
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);

	return (
		<>
			{tags.length > 1 && (
				<>
					<DesktopTagFilter />
					<MobileTagFilter />
				</>
			)}
		</>
	);
};

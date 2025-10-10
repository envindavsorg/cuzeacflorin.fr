import Image from 'next/image';
import type React from 'react';
import { FlipSentences } from '../components/FlipSentences';
import { PronounceMyName } from '../components/PronounceMyName';
import { USER } from '../data/user';
import { cn } from '../../../lib/utils';

export const ProfileHeader = (): React.JSX.Element => (
	<div className="screen-line-after flex border-edge border-x">
		<div className="shrink-0 border-edge border-r">
			<div className="mx-[2px] my-[3px]">
				<Image
					alt={`${USER.displayName}'s avatar`}
					className="size-26 select-none rounded-full object-cover object-top ring-1 ring-border ring-offset-2 ring-offset-background sm:size-32 lg:size-40"
					fetchPriority="high"
					height={1404}
					src={USER.avatar}
					width={1190}
				/>
			</div>
		</div>

		<div className="flex flex-1 flex-col">
			<div
				className={cn(
					'flex grow items-end pb-1 pl-4',
					'bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56'
				)}
			>
				<div className="line-clamp-1 select-none font-mono text-xs text-zinc-300 dark:text-zinc-800">
					<span className="min-sm:hidden">text-3xl</span>{' '}
					<span className="max-sm:hidden">text-4xl</span>{' '}
					<span>text-foreground</span> <span>font-semibold</span>{' '}
					<span>text-balance</span>
				</div>
			</div>

			<div className="border-edge border-t">
				<div className="flex w-full items-center gap-x-3">
					<h1 className="flex items-center text-balance pl-4 font-semibold text-3xl sm:text-4xl">
						{USER.displayName} ({USER.lastName})
					</h1>

					{USER.namePronunciationUrl && (
						<PronounceMyName
							className="translate-y-px"
							namePronunciationUrl={USER.namePronunciationUrl}
						/>
					)}
				</div>

				<div className="h-auto border-edge border-t py-1 pl-4">
					<FlipSentences sentences={USER.flipSentences} />
				</div>
			</div>
		</div>
	</div>
);

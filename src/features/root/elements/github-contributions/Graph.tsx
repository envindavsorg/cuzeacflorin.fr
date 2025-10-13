'use client';

import { SpinnerIcon } from '@phosphor-icons/react';
import type React from 'react';
import type { Activity } from '@/components/ui/ContributionGraph';
import {
	ContributionGraph,
	ContributionGraphBlock,
	ContributionGraphCalendar,
	ContributionGraphFooter,
	ContributionGraphLegend,
	ContributionGraphTotalCount,
} from '@/components/ui/ContributionGraph';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';
import { GITHUB_USERNAME } from '@/config/site';
import { dayjs } from '@/lib/dayjs';

type GraphProps = {
	contributions: Activity[];
};

export const Graph = ({ contributions }: GraphProps): React.JSX.Element => {
	const data = contributions;

	return (
		<ContributionGraph
			blockMargin={3}
			blockRadius={0}
			blockSize={11}
			className="mx-auto py-2"
			data={data}
		>
			<ContributionGraphCalendar className="no-scrollbar px-2">
				{({ activity, dayIndex, weekIndex }) => (
					<Tooltip>
						<TooltipTrigger asChild>
							<g>
								<ContributionGraphBlock
									activity={activity}
									dayIndex={dayIndex}
									weekIndex={weekIndex}
								/>
							</g>
						</TooltipTrigger>

						<TooltipContent className="font-sans" sideOffset={0}>
							<p>
								{activity.count} contribution{activity.count > 1 ? 's' : null}{' '}
								le {dayjs(activity.date).format('dddd DD MMM YYYY')}
							</p>
						</TooltipContent>
					</Tooltip>
				)}
			</ContributionGraphCalendar>

			<ContributionGraphFooter className="px-2">
				<ContributionGraphTotalCount>
					{({ totalCount, year }) => (
						<div className="text-muted-foreground text-xs sm:text-sm">
							{totalCount.toLocaleString('en')} contributions en {year} sur{' '}
							<a
								className="font-medium underline underline-offset-4"
								href={`https://github.com/${GITHUB_USERNAME}`}
								rel="noopener"
								target="_blank"
							>
								GitHub
							</a>
							.
						</div>
					)}
				</ContributionGraphTotalCount>

				<ContributionGraphLegend />
			</ContributionGraphFooter>
		</ContributionGraph>
	);
};

export const GraphFallback = (): React.JSX.Element => (
	<div className="flex h-[162px] w-full items-center justify-center">
		<SpinnerIcon className="animate-spin text-muted-foreground" />
	</div>
);

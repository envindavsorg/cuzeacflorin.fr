import { useWindowSize } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import type React from 'react';
import { memo, useMemo } from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { useBrowser } from '@/hooks/useBrowser';
import { date } from '@/lib/dayjs';
import { cn } from '@/lib/utils';

type MetadataProps = {
	intersect: boolean;
};

export const Metadata = memo(
	({ intersect }: MetadataProps): React.JSX.Element => {
		const { name: browserName, icon: BrowserIcon } = useBrowser();
		const { width = 0, height = 0 } = useWindowSize();
		const dimensionsText = useMemo(
			() => `${width}x${height} pixels`,
			[width, height]
		);
		const commitAt = dayjs(process.env.NEXT_PUBLIC_GIT_COMMIT_DATE);
		const isToday = commitAt.isValid() && commitAt.isSame(dayjs(), 'day');
		const lastUpdated = isToday
			? `Aujourd'hui à ${commitAt.format('HH:mm')}`
			: commitAt.format('ddd DD MMM YYYY à HH:mm');

		return (
			<div className="flex flex-col gap-y-3">
				<h2 className="font-semibold text-sm">Meta-données :</h2>

				<div
					className={cn(
						'grid grid-cols-4 gap-3 md:grid-cols-3 lg:grid-cols-5',
						'*:flex *:flex-col *:gap-y-1 *:text-sm'
					)}
				>
					<div className="max-md:col-span-2">
						<span>Dernier commit :</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={String(process.env.NEXT_PUBLIC_GIT_COMMIT)}
							trigger={intersect}
						/>
					</div>

					<div className="max-md:col-span-2">
						<span>Navigateur :</span>
						<div className="flex items-center gap-2">
							{BrowserIcon && <BrowserIcon className="size-4" />}
							<ScrambleText
								className="text-muted-foreground italic"
								text={browserName}
								trigger={intersect}
							/>
						</div>
					</div>

					<div className="max-md:col-span-full">
						<span>Date actuelle :</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={date().format('ddd DD MMM YYYY')}
							trigger={intersect}
						/>
					</div>

					<div className="max-md:col-span-full">
						<span>
							Résolution <span className="max-md:hidden">écran</span>{' '}
							<span className="min-md:hidden">de votre appareil</span> :
						</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={dimensionsText}
							trigger={intersect}
						/>
					</div>

					<div className="col-span-full md:col-span-2 lg:col-span-1">
						<span className="max-md:hidden">Mise à jour :</span>
						<span className="min-md:hidden">
							Dernière mise à jour publiée :
						</span>
						<div className="flex items-baseline gap-x-2">
							<ScrambleText
								className="text-muted-foreground italic"
								text={lastUpdated}
								trigger={intersect}
							/>
							<ScrambleText
								className="font-medium text-theme text-xs italic min-lg:hidden"
								text={`(${dayjs().to(dayjs(commitAt))})`}
								trigger={intersect}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

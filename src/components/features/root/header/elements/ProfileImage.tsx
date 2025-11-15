import Image from 'next/image';
import { USER } from '@/features/root/data/user';
import { cn } from '@/lib/utils';

export const ProfileImage = () => (
	<div className="shrink-0 border-edge border-r">
		<div className="mx-[2px] my-[3px]">
			<Image
				alt={`${USER.firstName} ${USER.lastName}`}
				className={cn(
					'size-26 select-none sm:size-32 lg:size-40',
					'rounded-full object-cover object-top',
					'ring-1 ring-border ring-offset-2 ring-offset-background',
				)}
				fetchPriority="high"
				height={1404}
				src={USER.avatar}
				width={1190}
			/>
		</div>
	</div>
);

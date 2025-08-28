import { motion } from 'motion/react';
import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Fade, FadeStagger } from '@/components/animation/Fade';
import { Filter } from '@/components/navigation/Filters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName } = PROFILE_CONFIG;

type NavBarProps = {
	setFilter: Dispatch<SetStateAction<FilterType>>;
};

export const NavBar = ({ setFilter }: NavBarProps): React.JSX.Element => (
	<motion.nav animate={{ opacity: 1 }} initial={{ opacity: 1 }}>
		<FadeStagger
			className="flex w-full flex-col items-center justify-center gap-y-8 px-[4.5vw] pt-10 max-sm:justify-center"
			faster
		>
			<Fade asChild>
				<Avatar className="size-18 md:size-14">
					<AvatarImage alt={`${firstName} ${lastName}`} src="/avatar.webp" />
					<AvatarFallback>CF</AvatarFallback>
				</Avatar>
			</Fade>
			<Fade asChild>
				<Filter setFilterAction={setFilter} />
			</Fade>
		</FadeStagger>
	</motion.nav>
);

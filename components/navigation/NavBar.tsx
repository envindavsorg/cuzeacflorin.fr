import { motion } from 'motion/react';
import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Fade, FadeStagger } from '@/components/animation/Fade';
import { Filter } from '@/components/filters/Filters';
import { Name } from '@/components/icons/Name';
import { cn } from '@/lib/utils';

type NavBarProps = {
	setFilter: Dispatch<SetStateAction<FilterType>>;
	firstName: string;
	lastName: string;
	className?: string;
};

export const NavBar = ({
	setFilter,
	className,
}: NavBarProps): React.JSX.Element => (
	<motion.nav animate={{ opacity: 1 }} initial={{ opacity: 1 }}>
		<FadeStagger className={cn('w-full px-[4.5vw]', className)} faster>
			<Fade asChild>
				<Name />
			</Fade>
			<Fade asChild>
				<Filter setFilterAction={setFilter} />
			</Fade>
		</FadeStagger>
	</motion.nav>
);

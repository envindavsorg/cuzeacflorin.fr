import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Fade, FadeStagger } from '@/components/animation/Fade';
import { Filter } from '@/components/navigation/Filters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { PROFILE_CONFIG } from '@/resources/profile';

const { contact } = PROFILE_CONFIG;

type NavBarProps = {
	setFilter: Dispatch<SetStateAction<FilterType>>;
};

export const NavBar = ({ setFilter }: NavBarProps): React.JSX.Element => (
	<motion.nav animate={{ opacity: 1 }} initial={{ opacity: 1 }}>
		<FadeStagger
			className="flex w-full items-center justify-between px-[4.5vw] max-sm:justify-center max-md:flex-col max-md:gap-y-6 max-md:pt-10 min-md:h-30"
			faster
		>
			<Fade asChild>
				<Avatar className="size-14 md:size-12">
					<AvatarImage src="/avatar.webp" />
					<AvatarFallback>CF</AvatarFallback>
				</Avatar>
			</Fade>
			<Fade asChild>
				<Filter setFilterAction={setFilter} />
			</Fade>
			<Fade asChild>
				<Link
					aria-label="N'hésitez pas à me contacter !"
					className="font-bold font-mono text-sm max-md:hidden"
					href={`mailto:${contact.email}`}
					rel="noopener noreferrer"
					target="_blank"
				>
					Contact
				</Link>
			</Fade>
		</FadeStagger>
	</motion.nav>
);

import { motion, useAnimation } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Filter } from '@/components/navigation/Filters';

type NavBarProps = {
	setFilter: Dispatch<SetStateAction<'all' | 'about' | 'projects' | 'blog'>>;
};

export const NavBar = ({ setFilter }: NavBarProps): React.JSX.Element => {
	const controls = useAnimation();

	return (
		<motion.nav
			animate={{ opacity: 1 }}
			className="flex h-[136px] w-full items-center justify-between px-[3.5vw] max-sm:h-[180px] max-sm:flex-col max-sm:justify-center"
			initial={{ opacity: 1 }}
		>
			<div className="max-sm:mt-9 max-sm:mb-6">
				<Image
					alt=""
					height={24}
					onLoad={(e: any) => {
						e.target?.src.indexOf('data:image/gif;base64') < 0 &&
							(controls.set({
								y: 15,
								opacity: 0,
							}),
							controls.start({
								y: 0,
								opacity: 1,
								transition: {
									duration: 0.5,
									ease: 'easeInOut',
								},
							}));
					}}
					src="/images/logo.svg"
					width={72}
				/>
			</div>
			<Filter setFilter={setFilter} />
			<Link
				className="font-normal text-[var(--text)] text-sm leading-6 tracking-[0.25px] transition-all duration-200 ease-in-out hover:cursor-pointer hover:opacity-60 max-sm:hidden"
				href="mailto:houssaineamzil18@gmail.com"
				style={{ lineHeight: 'normal' }}
			>
				Contact
			</Link>
		</motion.nav>
	);
};

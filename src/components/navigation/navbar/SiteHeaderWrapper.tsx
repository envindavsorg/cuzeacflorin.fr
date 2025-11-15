'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import type React from 'react';
import { useState } from 'react';

export const SiteHeaderWrapper = (props: React.ComponentProps<'header'>) => {
	const { scrollY } = useScroll();

	const [affix, setAffix] = useState(false);

	useMotionValueEvent(scrollY, 'change', (latestValue) => {
		setAffix(latestValue >= 8);
	});

	return <header data-affix={affix} {...props} />;
};

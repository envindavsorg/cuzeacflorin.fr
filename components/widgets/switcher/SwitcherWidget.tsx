'use client';

import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { ThemeButton } from '@/components/widgets/switcher/ThemeButton';
import { ThemeDisplay } from '@/components/widgets/switcher/ThemeDisplay';
import useThemeTransition from '@/hooks/useThemeTransition';
import { cn } from '@/lib/utils';

export const SwitcherWidget = memo((): React.JSX.Element => {
	const {
		isDarkMode,
		isMounted,
		hasUserInteracted,
		buttonRef,
		resolvedTheme,
		changeTheme,
	} = useThemeTransition();

	return (
		<Card
			className={cn(
				'!gap-3 flex-col items-center justify-center rounded-3xl md:p-4 lg:p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
			pattern
		>
			<ThemeButton
				hasUserInteracted={hasUserInteracted}
				isDarkMode={isDarkMode}
				onClick={changeTheme}
				ref={buttonRef}
			/>
			<ThemeDisplay isMounted={isMounted} resolvedTheme={resolvedTheme} />
		</Card>
	);
});

SwitcherWidget.displayName = 'SwitcherWidget';

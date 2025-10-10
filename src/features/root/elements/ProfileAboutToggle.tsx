'use client';

import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import type React from 'react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

type ProfileAboutToggleProps = {
	children: React.ReactNode;
};

const ProfileAboutToggle = ({
	children,
}: ProfileAboutToggleProps): React.JSX.Element => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			{isExpanded && children}
			<div className="screen-line-before flex justify-center py-2">
				<Button onClick={() => setIsExpanded(!isExpanded)} variant="default">
					{isExpanded ? 'Voir moins' : 'En savoir plus'}
					{isExpanded ? (
						<CaretUpIcon className="size-4" />
					) : (
						<CaretDownIcon className="size-4" />
					)}
				</Button>
			</div>
		</>
	);
};

ProfileAboutToggle.displayName = 'ProfileAboutToggle';

export { ProfileAboutToggle };

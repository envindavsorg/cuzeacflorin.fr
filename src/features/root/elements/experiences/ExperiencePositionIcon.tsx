import type { Icon, IconProps } from '@phosphor-icons/react';
import {
	BriefcaseIcon,
	CodeIcon,
	GraduationCapIcon,
	PaletteIcon,
} from '@phosphor-icons/react/ssr';
import type React from 'react';
import type { ExperiencePositionIcon } from '@/features/root/data/experiences';

const iconMap: Record<ExperiencePositionIcon, Icon> = {
	code: CodeIcon,
	design: PaletteIcon,
	education: GraduationCapIcon,
};

export const ExperienceIcon = ({
	icon,
	...props
}: {
	icon: ExperiencePositionIcon | undefined;
} & IconProps): React.JSX.Element => {
	const IconComponent = icon ? iconMap[icon] : BriefcaseIcon;
	return <IconComponent {...props} />;
};

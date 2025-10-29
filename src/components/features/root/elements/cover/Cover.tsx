import type React from 'react';
import { DynamicCover } from './DynamicCover';
import { StaticCover } from './StaticCover';

export const Cover = (): React.JSX.Element =>
	process.env.ENV_TYPE === 'capture' ? <StaticCover /> : <DynamicCover />;

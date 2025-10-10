import type React from 'react';
import type { SVGProps } from 'react';

const FrenchFlag = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg
		height="32"
		viewBox="0 0 32 32"
		width="32"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>France</title>
		<path d="M10 4H22V28H10z" fill="#fff" />
		<path
			d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
			fill="#092050"
		/>
		<path
			d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
			fill="#be2a2c"
			transform="rotate(180 26 16)"
		/>
		<path
			d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
			opacity=".15"
		/>
		<path
			d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
			fill="#fff"
			opacity=".2"
		/>
	</svg>
);

FrenchFlag.displayName = 'FrenchFlag';

export { FrenchFlag };

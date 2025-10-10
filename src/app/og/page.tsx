import type React from 'react';
import { Divider } from '../../components/ui/Divider';
import { ProfileHeader } from '../../features/root/elements/ProfileHeader';
import { ProfileOverview } from '../../features/root/elements/ProfileOverview';

const Page = (): React.JSX.Element => (
	<div className="mx-auto flex h-screen flex-col justify-center md:max-w-3xl">
		<div className="screen-line-after after:-bottom-px grow border-edge border-x">
			<div className="flex h-4" />
		</div>

		<ProfileHeader />
		<Divider />
		<ProfileOverview />

		<div className="grow border-edge border-x" />
	</div>
);

export default Page;

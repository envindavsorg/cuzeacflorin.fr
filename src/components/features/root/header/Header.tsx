import { USER } from '@/features/root/data/user';
import { FlipSentences } from './elements/FlipSentences';
import { ProfileImage } from './elements/ProfileImage';
import { PronounceName } from './elements/PronounceName';
import { WelcomeMessage } from './elements/WelcomeMessage';

export type HeaderProps = {
	capture?: boolean;
};

export const Header = ({ capture }: HeaderProps) => (
	<div className="screen-line-after flex border-edge border-x">
		<ProfileImage />

		<div className="flex flex-1 flex-col">
			<WelcomeMessage />

			<div className="border-edge border-t">
				<div className="flex w-full items-center gap-x-3">
					<h1 className="flex items-center text-balance pl-4 font-semibold text-3xl sm:text-4xl">
						{USER.displayName} {USER.lastName}
					</h1>

					{USER.namePronunciationUrl && !capture && (
						<PronounceName
							namePronunciationUrl={USER.namePronunciationUrl}
						/>
					)}
				</div>

				<div className="h-auto border-edge border-t py-1 pl-4">
					{capture ? (
						<p className="select-none text-balance font-mono text-muted-foreground text-sm">
							{USER.flipSentences[0]}
						</p>
					) : (
						<FlipSentences sentences={USER.flipSentences} />
					)}
				</div>
			</div>
		</div>
	</div>
);

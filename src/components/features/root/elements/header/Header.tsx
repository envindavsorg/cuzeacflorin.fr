import type React from 'react';
import { PronounceMyName } from '@/components/features/root/components/PronounceMyName';
import { USER } from '@/components/features/root/data/user';
import { FlipSentences } from '@/registry/flip-sentences';
import { ProfileImage } from './ProfileImage';
import { WelcomeMessage } from './WelcomeMessage';

export const Header = (): React.JSX.Element => (
	<div className="screen-line-after flex border-edge border-x">
		<ProfileImage />

		<div className="flex flex-1 flex-col">
			<WelcomeMessage />

			<div className="border-edge border-t">
				<div className="flex w-full items-center gap-x-3">
					<h1 className="flex items-center text-balance pl-4 font-semibold text-3xl sm:text-4xl">
						{USER.displayName} ({USER.lastName})
					</h1>

					{USER.namePronunciationUrl && (
						<PronounceMyName
							className="translate-y-px"
							namePronunciationUrl={USER.namePronunciationUrl}
						/>
					)}
				</div>

				<div className="h-auto border-edge border-t py-1 pl-4">
					{process.env.ENV_TYPE === 'capture' ? (
						<p>{USER.flipSentences[0]}</p>
					) : (
						<FlipSentences sentences={USER.flipSentences} />
					)}
				</div>
			</div>
		</div>
	</div>
);

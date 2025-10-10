import { logger } from './logger';

class SoundManager {
	private readonly audioCache = new Map<string, HTMLAudioElement>();
	private readonly isClient = typeof window !== 'undefined';

	private readonly getAudio = (url: string): HTMLAudioElement => {
		let audio = this.audioCache.get(url);

		if (!audio) {
			audio = new Audio(url);
			audio.preload = 'auto';
			this.audioCache.set(url, audio);
		}

		return audio;
	};

	playAudio = (url: string): void => {
		if (!this.isClient) {
			return;
		}

		const audio = this.getAudio(url);
		audio.currentTime = 0;

		audio.play().catch((err) => {
			logger.warn(`Audio play failed for ${url}:`, err);
		});
	};

	playThemeSound = (): void => this.playAudio('/audio/click.wav');

	playToastSound = (): void => this.playAudio('/audio/notification.wav');

	preload = (urls: string[]): void => {
		if (!this.isClient) {
			return;
		}

		for (const url of urls) {
			this.getAudio(url);
		}
	};

	dispose = (): void => {
		for (const audio of this.audioCache.values()) {
			audio.pause();
			audio.src = '';
		}
		this.audioCache.clear();
	};
}

export const soundManager = new SoundManager();

'use client';

import {
	ArrowsClockwiseIcon,
	CheckIcon,
	CopyIcon,
} from '@phosphor-icons/react';
import { type ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { DirectionAwareTabs } from '@/components/ui/DirectionAwareTabs';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';

export const Base64 = () => {
	const [encodeInputText, setEncodeInputText] = useState('');
	const [encodeOutputText, setEncodeOutputText] = useState('');
	const [decodeInputText, setDecodeInputText] = useState('');
	const [decodeOutputText, setDecodeOutputText] = useState('');
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const encodeToBase64 = useCallback((text: string) => {
		try {
			const uint8Array = new TextEncoder().encode(text);
			const binaryString = Array.from(uint8Array, (byte) =>
				String.fromCodePoint(byte),
			).join('');
			const encoded = btoa(binaryString);
			setEncodeOutputText(encoded);
			setError(null);
		} catch (_err) {
			setError("Erreur lors de l'encodage");
			setEncodeOutputText('');
		}
	}, []);

	const decodeFromBase64 = useCallback((text: string) => {
		try {
			const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
			const cleanText = text.trim();

			if (!base64Regex.test(cleanText)) {
				setError(
					'Format Base64 invalide. Utilisez uniquement A-Z, a-z, 0-9, +, / et =',
				);
				setDecodeOutputText('');
				return;
			}

			const urlDecoded = decodeURIComponent(cleanText);
			const binaryString = atob(urlDecoded);
			const uint8Array = Uint8Array.from(
				binaryString,
				(char) => char.codePointAt(0) ?? 0,
			);
			const decoded = new TextDecoder('utf-8', { fatal: true }).decode(
				uint8Array,
			);

			if (decoded.includes('\uFFFD')) {
				setError(
					'Le texte décodé contient des caractères invalides. Vérifiez le Base64.',
				);
				setDecodeOutputText('');
				return;
			}

			setDecodeOutputText(decoded);
			setError(null);
		} catch (_err) {
			setError(
				'Erreur lors du décodage. Vérifiez que le texte est un Base64 valide.',
			);
			setDecodeOutputText('');
		}
	}, []);

	const handleEncodeInputChange = useCallback(
		(value: string) => {
			setEncodeInputText(value);
			if (value) {
				encodeToBase64(value);
			} else {
				setEncodeOutputText('');
			}
		},
		[encodeToBase64],
	);

	const handleDecodeInputChange = useCallback(
		(value: string) => {
			setDecodeInputText(value);
			if (value) {
				decodeFromBase64(value);
			} else {
				setDecodeOutputText('');
				setError(null);
			}
		},
		[decodeFromBase64],
	);

	const handleCopy = useCallback((text: string, field: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 2000);
		toast.success('Texte copié dans le presse-papier !');
	}, []);

	const handleReset = useCallback(() => {
		setEncodeInputText('');
		setEncodeOutputText('');
		setDecodeInputText('');
		setDecodeOutputText('');
		setError(null);
	}, []);

	// tabs
	const tabs = [
		{
			id: 0,
			label: 'Encoder',
			content: (
				<div className="flex w-full flex-col gap-y-6 overflow-hidden">
					<div className="flex flex-col gap-y-3">
						<div className="flex items-center justify-between">
							<h3 className="mt-0 font-semibold text-base">
								Texte à encoder
							</h3>
							{encodeInputText && (
								<Button
									onClick={() =>
										handleCopy(
											encodeInputText,
											'encode-input',
										)
									}
									size="icon:sm"
									variant="ghost"
								>
									{copiedField === 'encode-input' ? (
										<CheckIcon className="size-5" />
									) : (
										<CopyIcon className="size-5" />
									)}
								</Button>
							)}
						</div>
						<Textarea
							className="min-h-[120px] font-mono sm:min-h-[150px]"
							onChange={(
								event: ChangeEvent<HTMLTextAreaElement>,
							) => handleEncodeInputChange(event.target.value)}
							placeholder="Entrez votre texte ici..."
							value={encodeInputText}
						/>
					</div>
					<div className="flex flex-col gap-y-3">
						<div className="flex items-center justify-between">
							<h3 className="mt-0 font-semibold text-base">
								Base64
							</h3>
							{encodeOutputText && (
								<Button
									onClick={() =>
										handleCopy(
											encodeOutputText,
											'encode-output',
										)
									}
									size="sm"
									variant="ghost"
								>
									{copiedField === 'encode-output' ? (
										<CheckIcon className="size-5" />
									) : (
										<CopyIcon className="size-5" />
									)}
								</Button>
							)}
						</div>
						<div className="min-h-[120px] w-full overflow-auto rounded-md border border-input bg-background px-3 py-2 font-mono text-sm sm:min-h-[150px]">
							{encodeOutputText}
						</div>
					</div>
				</div>
			),
		},
		{
			id: 1,
			label: 'Décoder',
			content: (
				<div className="flex w-full flex-col gap-y-6 overflow-hidden">
					<div className="flex flex-col gap-y-3">
						<div className="flex items-center justify-between">
							<h3 className="mt-0 font-semibold text-base">
								Base64
							</h3>
							{decodeInputText && (
								<Button
									onClick={() =>
										handleCopy(
											decodeInputText,
											'decode-input',
										)
									}
									size="sm"
									variant="ghost"
								>
									{copiedField === 'decode-input' ? (
										<CheckIcon className="size-5" />
									) : (
										<CopyIcon className="size-5" />
									)}
								</Button>
							)}
						</div>
						<Textarea
							className="min-h-[120px] font-mono sm:min-h-[150px]"
							onChange={(
								event: ChangeEvent<HTMLTextAreaElement>,
							) => handleDecodeInputChange(event.target.value)}
							placeholder="Collez du Base64 ici pour le décoder..."
							value={decodeInputText}
						/>
					</div>
					<div className="flex flex-col gap-y-3">
						<div className="flex items-center justify-between">
							<h3 className="mt-0 font-semibold text-base">
								Texte décodé
							</h3>
							{decodeOutputText && (
								<Button
									onClick={() =>
										handleCopy(
											decodeOutputText,
											'decode-output',
										)
									}
									size="sm"
									variant="ghost"
								>
									{copiedField === 'decode-output' ? (
										<CheckIcon className="size-5" />
									) : (
										<CopyIcon className="size-5" />
									)}
								</Button>
							)}
						</div>
						<div
							className={cn(
								'min-h-[120px] w-full overflow-auto rounded-md border border-input bg-background px-3 py-2 font-mono text-sm sm:min-h-[150px]',
								error && 'text-red-600 dark:text-red-300',
							)}
						>
							{error ? error : decodeOutputText}
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<>
			<div className="screen-line-before w-full border-edge border-b" />

			<div className="p-4">
				<DirectionAwareTabs tabs={tabs} />

				<div className="mt-6 flex justify-end">
					<Button
						className="text-sm"
						onClick={handleReset}
						variant="outline"
					>
						<ArrowsClockwiseIcon className="size-5" />
						Réinitialiser les champs
					</Button>
				</div>
			</div>

			<div className="screen-line-before w-full border-edge border-b" />
		</>
	);
};

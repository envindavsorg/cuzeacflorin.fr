'use client';

import {
	ArrowsClockwiseIcon,
	CheckIcon,
	CopyIcon,
} from '@phosphor-icons/react';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { PostShareMenu } from '@/blog/components/PostShareMenu';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Prose } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

const Base64Page = () => {
	const [inputText, setInputText] = useState('');
	const [encodedText, setEncodedText] = useState('');
	const [decodedText, setDecodedText] = useState('');
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const encodeToBase64 = useCallback((text: string) => {
		try {
			const uint8Array = new TextEncoder().encode(text);
			const binaryString = Array.from(uint8Array, (byte) =>
				String.fromCodePoint(byte)
			).join('');
			const encoded = btoa(binaryString);
			setEncodedText(encoded);
			setError(null);
		} catch (_err) {
			setError("Erreur lors de l'encodage");
			setEncodedText('');
		}
	}, []);

	const decodeFromBase64 = useCallback((text: string) => {
		try {
			const urlDecoded = decodeURIComponent(text);
			const binaryString = atob(urlDecoded);
			const uint8Array = Uint8Array.from(
				binaryString,
				(char) => char.codePointAt(0) ?? 0
			);
			const decoded = new TextDecoder().decode(uint8Array);
			setDecodedText(decoded);
			setError(null);
		} catch (_err) {
			setError(
				'Erreur lors du décodage. Vérifiez que le texte est un Base64 valide.'
			);
			setDecodedText('');
		}
	}, []);

	const handleInputChange = useCallback(
		(value: string) => {
			setInputText(value);
			if (value) {
				encodeToBase64(value);
			} else {
				setEncodedText('');
			}
		},
		[encodeToBase64]
	);

	const handleEncodedChange = useCallback(
		(value: string) => {
			setEncodedText(value);
			if (value) {
				decodeFromBase64(value);
			} else {
				setDecodedText('');
				setError(null);
			}
		},
		[decodeFromBase64]
	);

	const handleCopy = useCallback((text: string, field: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		setTimeout(() => setCopiedField(null), 2000);
		toast.success('Texte copié dans le presse-papier !');
	}, []);

	const handleReset = useCallback(() => {
		setInputText('');
		setEncodedText('');
		setDecodedText('');
		setError(null);
	}, []);

	return (
		<>
			<div className="flex items-center justify-between p-2 pl-4">
				<Button
					asChild
					className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
					variant="link"
				>
					<Link href="/utils">
						<ArrowLeftIcon className="size-4" />
						Tous les outils
					</Link>
				</Button>

				<PostShareMenu url="/utils/base64" />
			</div>

			<div className="screen-line-before screen-line-after">
				<div
					className={cn(
						'h-8',
						'before:-left-[100vw] before:-z-1 before:absolute before:h-full before:w-[200vw]',
						'before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56'
					)}
				/>
			</div>

			<Prose className="px-4">
				<h1 className="screen-line-after !mb-0 font-semibold">
					Encodeur / Décodeur Base64
				</h1>

				<p className="lead mt-0 py-3">
					Encodez et décodez facilement vos textes en Base64. Collez votre texte
					dans le champ d'entrée pour l'encoder, ou collez du Base64 dans le
					champ encodé pour le décoder automatiquement. Idéal pour les API, les
					headers HTTP, et le stockage de données.
				</p>
			</Prose>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="flex justify-end p-4">
				<Button className="text-sm" onClick={handleReset} variant="outline">
					<ArrowsClockwiseIcon className="size-5" />
					Réinitialiser
				</Button>
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="space-y-6 p-4">
				<div className="overflow-hidden">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-semibold text-xl">Texte à encoder :</h3>
						{inputText && (
							<Button
								onClick={() => handleCopy(inputText, 'input')}
								size="sm"
								variant="ghost"
							>
								{copiedField === 'input' ? (
									<CheckIcon className="size-5" />
								) : (
									<CopyIcon className="size-5" />
								)}
							</Button>
						)}
					</div>
					<Textarea
						className="min-h-[120px] font-mono"
						onChange={(e) => handleInputChange(e.target.value)}
						placeholder="Entrez votre texte ici..."
						value={inputText}
					/>
				</div>

				<div className="overflow-hidden">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-semibold text-xl">Base64 encodé :</h3>
						{encodedText && (
							<Button
								onClick={() => handleCopy(encodedText, 'encoded')}
								size="sm"
								variant="ghost"
							>
								{copiedField === 'encoded' ? (
									<CheckIcon className="size-5" />
								) : (
									<CopyIcon className="size-5" />
								)}
							</Button>
						)}
					</div>
					<Textarea
						className="min-h-[120px] font-mono"
						onChange={(e) => handleEncodedChange(e.target.value)}
						placeholder="Ou collez du Base64 ici pour le décoder..."
						value={encodedText}
					/>
				</div>

				{/* Résultat décodé */}
				{decodedText && (
					<div className="overflow-hidden">
						<div className="mb-3 flex items-center justify-between">
							<h3 className="font-semibold text-xl">Texte décodé :</h3>
							<Button
								onClick={() => handleCopy(decodedText, 'decoded')}
								size="sm"
								variant="ghost"
							>
								{copiedField === 'decoded' ? (
									<CheckIcon className="size-5" />
								) : (
									<CopyIcon className="size-5" />
								)}
							</Button>
						</div>
						<div className="min-h-[120px] w-full overflow-auto rounded-md border border-input bg-background px-3 py-2 font-mono text-sm">
							{decodedText}
						</div>
					</div>
				)}

				{/* Erreur */}
				{error && (
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className="rounded-lg border-1 border-red-600 bg-destructive/10 p-4 text-center font-medium text-red-600 text-sm dark:border-red-300 dark:text-red-300"
						initial={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.3 }}
					>
						{error}
					</motion.div>
				)}
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="overflow-hidden p-4">
				<h3 className="mb-3 font-semibold text-xl">À propos de Base64 :</h3>
				<div className="space-y-1 text-sm">
					<p>
						Base64 est un système d'encodage qui convertit des données binaires
						en texte ASCII.
					</p>
					<p>Il est couramment utilisé pour :</p>
					<ul className="mt-3 ml-6 list-disc space-y-1">
						<li>Transmettre des données binaires via des protocoles texte</li>
						<li>Encoder des images dans du HTML/CSS (Data URLs)</li>
						<li>Stocker des données complexes dans des formats JSON/XML</li>
						<li>Encoder des credentials dans les headers HTTP</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Base64Page;

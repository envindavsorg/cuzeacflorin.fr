'use client';

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Combobox } from '@/components/ui/Combobox';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { generateLoremIpsum } from '@/lib/lorem-ipsum';

const generationOptions = [
	{
		value: 'paragraphs',
		label: 'Paragraphes',
	},
	{
		value: 'sentences',
		label: 'Phrases',
	},
	{
		value: 'words',
		label: 'Mots',
	},
];

declare type GenerationUnit = 'words' | 'sentences' | 'paragraphs';

export const LoremIpsumGenerator = (): React.JSX.Element => {
	const [inputAmount, setInputAmount] = useState(1);
	const [output, setOutput] = useState('');
	const [generationUnit, setGenerationUnit] =
		useState<GenerationUnit>('paragraphs');
	const [asHTML, setAsHTML] = useState(false);
	const [startWithStandard, setStartWithStandard] = useState(false);
	const { buttonText, handleCopy } = useCopyToClipboard();

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value = Number.parseInt(event.currentTarget.value, 10);

		if (value > 0 && value < 100) {
			setInputAmount(value);
		}
	};

	const generateText = useCallback(() => {
		const text = generateLoremIpsum({
			generationUnit,
			inputAmount,
			startWithStandard,
			asHTML,
		});

		setOutput(text);
	}, [inputAmount, generationUnit, asHTML, startWithStandard]);

	useEffect(() => {
		generateText();
	}, [generateText]);

	return (
		<div className="flex flex-col py-6">
			<div className="mb-6 flex w-full gap-4">
				<div className="flex-1">
					<Label className="mb-3">Quantité</Label>
					<Input
						className="h-8 text-sm"
						onChange={handleChange}
						onFocus={(event: { target: { select: () => any } }) =>
							event.target.select()
						}
						placeholder="Entrer un nombre"
						type="number"
						value={inputAmount}
					/>
				</div>
				<div className="flex flex-col justify-end">
					<Combobox
						data={generationOptions}
						onSelect={(value: GenerationUnit) => setGenerationUnit(value)}
						value={generationUnit}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-3 sm:items-center sm:gap-6 md:flex-row">
				<div className="flex items-center gap-1">
					<Checkbox
						checked={startWithStandard}
						className="mr-1"
						disabled={generationUnit === 'words'}
						id="standard-sentence"
						onCheckedChange={() => setStartWithStandard(!startWithStandard)}
					/>
					<Label
						className="mb-0 hover:cursor-pointer"
						htmlFor="standard-sentence"
					>
						Commencer avec{' '}
						<span className="font-medium text-theme">Lorem Ipsum</span>
					</Label>
				</div>

				<div className="flex items-center gap-1">
					<Checkbox
						checked={asHTML}
						className="mr-1"
						id="as-html"
						onCheckedChange={() => setAsHTML(!asHTML)}
					/>
					<Label className="mb-0 hover:cursor-pointer" htmlFor="as-html">
						Au format <span className="font-medium text-theme">HTML</span>
					</Label>
				</div>
			</div>

			<div className="my-6 h-[1px] bg-edge" />

			<Label className="mb-3">Texte généré</Label>
			<Textarea className="mb-4" readOnly rows={9} value={output} />
			<div className="flex flex-1 justify-between">
				<Button onClick={() => handleCopy(output)} size="sm" variant="outline">
					{buttonText}
				</Button>
				<Button onClick={() => generateText()} size="sm">
					Générer à nouveau
				</Button>
			</div>
		</div>
	);
};

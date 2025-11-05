'use client';

import type { Player } from '@lordicon/react';
import Link from 'next/link';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import {
	Panel,
	PanelContent,
	PanelFooter,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';
import { USER } from '@/features/root/data/user';
import useEmailForm, { type EmailFormData } from '@/hooks/use-email-form';
import { cn } from '@/lib/utils';
import { ErrorContent } from './ErrorContent';
import { EmailFormContent } from './FormContent';
import { SuccessContent } from './SuccessContent';

type DialogState = 'form' | 'success' | 'error';

export const CV = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const [dialogState, setDialogState] = useState<DialogState>('form');

	const iconRef = useRef<Player>(null);
	const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { form, isLoading, sendEmail } = useEmailForm();

	useEffect(
		() => () => {
			if (resetTimeoutRef.current) {
				clearTimeout(resetTimeoutRef.current);
			}
		},
		[]
	);

	const handleSubmit = useCallback(
		async (data: EmailFormData) => {
			const success = await sendEmail(data);
			setDialogState(success ? 'success' : 'error');
		},
		[sendEmail]
	);

	const handleClose = useCallback(() => {
		setOpen(false);

		if (resetTimeoutRef.current) {
			clearTimeout(resetTimeoutRef.current);
		}

		resetTimeoutRef.current = setTimeout(() => {
			setDialogState('form');
			form.reset();
		}, 600);
	}, [form]);

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			setOpen(newOpen);
			if (!newOpen) {
				if (resetTimeoutRef.current) {
					clearTimeout(resetTimeoutRef.current);
				}

				resetTimeoutRef.current = setTimeout(() => {
					setDialogState('form');
					form.reset();
				}, 600);
			}
		},
		[form]
	);

	return (
		<Panel>
			<PanelHeader>
				<PanelTitle>Découvrir mon CV</PanelTitle>
			</PanelHeader>

			<PanelContent className="space-y-3 *:text-muted-foreground">
				<Prose>
					Découvrez mon parcours professionnel à travers mon{' '}
					<span className="font-medium text-foreground">CV détaillé</span>, qui
					retrace mes expériences, compétences techniques et réalisations dans
					le développement web full-stack. Vous y trouverez un{' '}
					<span className="font-medium text-foreground">aperçu complet</span> de
					mon expertise et de ma progression dans le domaine.
				</Prose>
				<Prose>
					Pour recevoir une{' '}
					<span className="font-medium text-foreground">copie actualisée</span>{' '}
					directement dans votre boîte e-mail, cliquez sur le bouton ci-dessous.
					Je serai ravi d'échanger avec vous sur d'éventuelles opportunités de
					collaboration.
				</Prose>
			</PanelContent>

			<PanelFooter className="flex justify-end gap-4">
				<Link
					aria-label={USER.documents.cv.title}
					href={USER.documents.cv.url}
					rel="noopener noreferrer"
					target="_blank"
				>
					<Button variant="outline">Voir et télécharger</Button>
				</Link>

				<Dialog onOpenChange={handleOpenChange} open={open}>
					<DialogTrigger asChild>
						<Button>Recevoir par mail</Button>
					</DialogTrigger>

					<DialogContent
						className={cn(
							dialogState !== 'form' &&
								'flex aspect-square items-center justify-center'
						)}
						onInteractOutside={(event) => event.preventDefault()}
					>
						{dialogState === 'success' && (
							<SuccessContent onClose={handleClose} ref={iconRef} />
						)}

						{dialogState === 'error' && (
							<ErrorContent onClose={handleClose} ref={iconRef} />
						)}

						{dialogState === 'form' && (
							<EmailFormContent
								form={form}
								isLoading={isLoading}
								onClose={handleClose}
								onSubmit={handleSubmit}
							/>
						)}
					</DialogContent>
				</Dialog>
			</PanelFooter>
		</Panel>
	);
};

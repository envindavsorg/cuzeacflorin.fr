'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	EnvelopeIcon,
	EyeIcon,
	PaperPlaneIcon,
	ReadCvLogoIcon,
} from '@phosphor-icons/react';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import consola from 'consola';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Spinner } from '@/components/ui/Spinner';
import { Prose } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';

const emailFormSchema = z.object({
	firstName: z
		.string()
		.min(1, 'Le prénom est requis !')
		.min(2, 'Le prénom doit contenir au moins 2 caractères !')
		.max(20, 'Le prénom doit contenir moins de 20 caractères !'),
	email: z.email('Adresse e-mail obligatoire !'),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

export const CV = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<EmailFormData>({
		resolver: zodResolver(emailFormSchema),
		defaultValues: {
			firstName: '',
			email: '',
		},
	});

	const onSubmit = async (data: EmailFormData) => {
		setIsLoading(true);

		try {
			const response = await fetch('/api/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Erreur lors de l'envoi !");
			}

			toast.success('Envoyé ! Vérifiez votre boîte de réception.');

			form.reset();
			setOpen(false);
		} catch (error) {
			consola.error('Une erreur est survenue:', error);
			toast.error("Erreur lors de l'envoi du mail !");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Panel>
			<PanelHeader>
				<PanelTitle>Mon CV</PanelTitle>
			</PanelHeader>

			<PanelContent>
				<Prose className="text-muted-foreground">
					Découvrez mon CV pour en savoir plus sur mon parcours, mes compétences
					et mes expériences professionnelles. Cliquez sur le bouton ci-dessous
					pour recevoir une copie directement dans votre boîte e-mail.
				</Prose>
			</PanelContent>

			<div className="screen-line-before flex justify-center gap-3 py-2 md:justify-end md:pr-4">
				<Link
					aria-label="Voir ou télécharger mon CV"
					href="https://cfhi75vpdo.ufs.sh/f/tIhJKzZYPGQBJWs54PG2sVmGEapT3CScHg1W4uQLZUI5FKoN"
					rel="noopener noreferrer"
					target="_blank"
				>
					<Button variant="outline">
						Voir mon CV <EyeIcon className="size-4" />
					</Button>
				</Link>

				<Dialog onOpenChange={setOpen} open={open}>
					<DialogTrigger asChild>
						<Button>
							Recevoir mon CV <EnvelopeIcon className="size-4" />
						</Button>
					</DialogTrigger>

					<DialogContent
						className={cn(
							'sm:top-auto sm:right-0 sm:bottom-0 sm:left-auto sm:m-6 sm:translate-x-0 sm:translate-y-0',
							'data-[state=open]:!zoom-in-100',
							'data-[state=open]:slide-in-from-bottom-20',
							'data-[state=open]:duration-600',
							'sm:max-w-[375px]'
						)}
					>
						<div className="flex items-center gap-x-3">
							<ReadCvLogoIcon className="size-6 text-theme" />
							<ArrowRightIcon className="size-4 text-muted-foreground" />
							<EnvelopeIcon className="size-6 text-theme" />
						</div>
						<DialogHeader>
							<DialogTitle className="mt-1 text-start leading-normal">
								Recevez mon CV directement dans votre boîte de réception !
							</DialogTitle>
							<DialogDescription className="text-start">
								Entrez votre prénom et votre adresse e-mail dans le formulaire
								ci-dessous pour recevoir immédiatement mon CV.
							</DialogDescription>
						</DialogHeader>

						<Form {...form}>
							<form
								className="mt-3 space-y-4"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs">Votre prénom :</FormLabel>
											<FormControl>
												<Input
													className="h-12"
													disabled={isLoading}
													placeholder="..."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs">
												Votre adresse e-mail :
											</FormLabel>
											<FormControl>
												<Input
													className="h-12"
													disabled={isLoading}
													placeholder="..."
													type="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<DialogFooter className="mt-6">
									<DialogClose asChild>
										<Button variant="outline">Fermer</Button>
									</DialogClose>
									<Button
										className="group ms-auto w-fit"
										disabled={isLoading}
										type="submit"
										variant="default"
									>
										{isLoading ? (
											<>
												Envoi du mail en cours ...
												<Spinner />
											</>
										) : (
											<>
												Recevoir
												<PaperPlaneIcon className="size-4 transition-transform duration-500 ease-in-out group-hover:rotate-45" />
											</>
										)}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</Panel>
	);
};

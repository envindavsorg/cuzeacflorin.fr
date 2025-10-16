'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownIcon, PaperPlaneIcon } from '@phosphor-icons/react';
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
			<Link
				aria-label="Voir et télécharger mon CV"
				className="no-underline"
				href="https://cfhi75vpdo.ufs.sh/f/tIhJKzZYPGQBJWs54PG2sVmGEapT3CScHg1W4uQLZUI5FKoN"
				rel="noopener noreferrer"
				target="_blank"
			>
				<PanelHeader className="group flex items-center justify-center gap-x-3 p-4">
					<ArrowDownIcon
						className="size-6 text-theme transition-transform duration-500 ease-in-out group-hover:rotate-180"
						weight="duotone"
					/>
					<PanelTitle className="!text-xl">
						Voir et télécharger mon CV
					</PanelTitle>
				</PanelHeader>
			</Link>

			<PanelContent>
				<Dialog onOpenChange={setOpen} open={open}>
					<DialogTrigger asChild>
						<Button size="sm" variant="default">
							Recevoir mon CV sur votre mail
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="leading-normal">
								Recevez mon CV directement dans votre boîte de réception !
							</DialogTitle>
							<DialogDescription>
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
									<Button
										className="group w-full"
										disabled={isLoading}
										size="lg"
										type="submit"
									>
										{isLoading ? (
											<>
												<span className="font-semibold text-sm">
													Envoi du mail en cours ...
												</span>
												<Spinner />
											</>
										) : (
											<>
												<span className="font-semibold text-sm">
													Recevoir mon CV
												</span>
												<PaperPlaneIcon className="size-4 transition-transform duration-500 ease-in-out group-hover:rotate-45" />
											</>
										)}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</PanelContent>
		</Panel>
	);
};

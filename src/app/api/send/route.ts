import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import consola from 'consola';
import { Resend } from 'resend';
import { z } from 'zod';
import { CVEmailTemplate } from '@/emails/CVEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
	firstName: z
		.string()
		.min(1, 'Le prénom est requis !')
		.min(2, 'Le prénom doit contenir au moins 2 caractères !')
		.max(20, 'Le prénom doit contenir moins de 20 caractères !'),
	email: z.email('Adresse e-mail obligatoire !'),
});

export const POST = async (request: Request): Promise<Response> => {
	try {
		const body = await request.json();
		const validation = emailSchema.safeParse(body);

		if (!validation.success) {
			return Response.json(
				{
					error: 'Données invalides !',
					details: validation.error.issues,
				},
				{
					status: 400,
				}
			);
		}

		const { firstName, email } = validation.data;

		const cvPath = join(process.cwd(), 'public', 'documents', 'resume.pdf');
		const cvBuffer = await readFile(cvPath);
		const cvBase64 = cvBuffer.toString('base64');

		const { data, error } = await resend.emails.send({
			from: 'Cuzeac Florin <contact@cuzeacflorin.fr>',
			to: [email],
			subject: 'CV - Cuzeac Florin | cuzeacflorin.fr',
			react: CVEmailTemplate({
				firstName,
				recipientEmail: email,
			}),
			attachments: [
				{
					filename: 'resume_cuzeac_florin.pdf',
					content: cvBase64,
				},
			],
		});

		if (error) {
			consola.error('Une erreur est survenue :', error);

			return Response.json(
				{ error: "Erreur lors de l'envoi de l'email !" },
				{ status: 500 }
			);
		}

		return Response.json({
			success: true,
			message: 'E-mail envoyé avec succès !',
			data,
		});
	} catch (error) {
		consola.error('Une erreur est survenue :', error);

		return Response.json(
			{ error: 'Une erreur est survenue' },
			{
				status: 500,
			}
		);
	}
};

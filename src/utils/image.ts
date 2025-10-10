import sharp from 'sharp';
import { logger } from '../lib/logger';

const convertImageToJpeg = async (imageBuffer: Buffer): Promise<Buffer> => {
	try {
		return await sharp(imageBuffer)
			.jpeg({
				quality: 90,
				progressive: true,
				mozjpeg: true,
			})
			.toBuffer();
	} catch (error) {
		logger.error('Error converting image to JPEG:', error);
		throw error;
	}
};

export default convertImageToJpeg;

import consola from 'consola';
import sharp from 'sharp';

const convertImageToJpeg = async (imageBuffer: Buffer) => {
	try {
		return await sharp(imageBuffer)
			.jpeg({ quality: 90, progressive: true, mozjpeg: true })
			.toBuffer();
	} catch (error) {
		consola.error('Error converting image to .jpeg !');
		throw error;
	}
};

export default convertImageToJpeg;

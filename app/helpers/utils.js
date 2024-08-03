const axios = require('axios');
const sharp = require('sharp');
const { Readable } = require('stream');

const getDirectImageUrl = (googleDriveUrl) => {
    const id = googleDriveUrl.split("/d/")[1].split("/")[0];
    return `https://drive.google.com/uc?export=view&id=${id}`;
};

const processImage = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageStream = Readable.from(response.data);

        const compressedImageBuffer = await sharp(response.data)
            .resize(214, 214)
            .toBuffer();

        const base64Image = compressedImageBuffer.toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};

module.exports = {
    getDirectImageUrl,
    processImage,
};

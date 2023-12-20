const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET } = process.env;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API,
    api_secret: CLOUD_SECRET,
    secure: true,
});

const uploadCloud = async (imagePath) => {
    const options = {
        folder: "healthy-way-app/avatars",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        width: 240,
        height: 240,
        crop: "fill",
        radius: "max",
        format: "png",
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);

        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = uploadCloud;

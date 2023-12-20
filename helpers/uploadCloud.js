// Require the cloudinary library
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
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
        folder: "healthy-way-app/avatars",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = uploadCloud;

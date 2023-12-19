// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET } = process.env;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API,
    api_secret: CLOUD_SECRET,
    secure: true,
});

// Log the configuration
console.log(cloudinary.config());

// Uploads an image file

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
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result.url);
        return result.url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = uploadCloud;

const multer = require("multer");
const path = require("node:path");

const destinationPathTemp = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: destinationPathTemp,
    filename: (req, file, cb) => {
        const { _id } = req.user;
        const filename = `${_id}`;
        // const userID = req.user._id;
        // const originalFileName = file.originalname;
        // const fileExt = path.parse(originalFileName).ext;

        // const destFileName = `${userID}${fileExt}`;
        cb(null, filename);
    },
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 2, // 2 MB
    },
});

const downloadAVA = multer({
    storage: multerConfig,
});

module.exports = downloadAVA;

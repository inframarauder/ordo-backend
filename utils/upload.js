const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const config = {
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	s3BucketEndpoint: false,
};

const s3 =
	process.env.NODE_ENV === "production" ? new AWS.S3() : new AWS.S3(config);

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "ordo",
		acl: "public-read",
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			let folder = "menu-items";
			const fullPathToFile = `${folder}/${Date.now()}_${file.originalname}`;
			cb(null, fullPathToFile);
		},
		limits: {
			fileSize: 5 * 1024 * 1024, //5MB limit
		},
		fileFilter: function (req, file, cb) {
			if (
				["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
					file.mimetype
				)
			) {
				cb(null, true);
			} else {
				cb(new Error("Only jpg,jpeg,png and gif files allowed", false));
			}
		},
	}),
});

module.exports = upload;

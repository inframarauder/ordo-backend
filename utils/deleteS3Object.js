const AWS = require("aws-sdk");

module.exports = (url) => {
	return new Promise((resolve, reject) => {
		const config = {
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			s3BucketEndpoint: false,
		};

		const s3 =
			process.env.NODE_ENV === "production" ? new AWS.S3() : new AWS.S3(config);
		const fileName = url.substring(url.lastIndexOf("/"));
		const params = {
			Bucket: "ordo",
			Key: `menu-items${fileName}`,
		};
		s3.deleteObject(params, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

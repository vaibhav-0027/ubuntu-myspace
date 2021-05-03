const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const amazonS3Uri = require('amazon-s3-uri');
const config = require("../config");

aws.config.update({
	secretAccessKey: config.s3Credentials.AWSSecretKey,
	accessKeyId: config.s3Credentials.AWSAccessKeyId,
	region: 'us-east-2',
});
const UPLOAD_BUCKET = 'ubuntu-myspace';

const s3Client = new aws.S3();

const s3Upload = multer({
	storage: multerS3({
		s3: s3Client,
		bucket: UPLOAD_BUCKET,
		metadata: function (req, file, cb) {
			cb(null, {fieldName: 'WORKSPACE_UPLOAD'}, req.body);
		},
		key: function (req, file, cb) {
			cb(null, `uploads/${file.originalname}`)
		}
	})
});

const s3GetSignedUrl = (url) => {
	const signedUrlExpireSeconds = 60 * 5;
	const {bucket, key} = amazonS3Uri(url);
	const signedUrl = s3Client.getSignedUrl('getObject', {
		Bucket: bucket,
		Key: key,
		Expires: signedUrlExpireSeconds
	});
	return signedUrl;
}

const deleteFileFromS3 = (url) => {
	const {bucket, key} = amazonS3Uri(url);
	s3Client.deleteObject({
		Bucket: bucket,
		Key: key,
	}, (err,data) => {

	});
}

module.exports = {
	s3Upload,
	s3GetSignedUrl,
	deleteFileFromS3,
};

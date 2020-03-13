module.exports = {
    async upload(file, params = {}) {
        const AWS = require('aws-sdk');
        const config = require('../config');

        const awsS3Client = new AWS.S3({
            signatureVersion: 'v4',
            region: config.AWS_S3_IMAGES_BUCKET_REGION,
        });

        const { Location } = await awsS3Client
            .upload({
                Bucket: config.AWS_S3_IMAGES_BUCKET_NAME,
                ACL: 'public-read',
                Body: file,
                ...params,
            })
            .promise();

        // console.log("Saved in S3");

        return Location;
    }
}

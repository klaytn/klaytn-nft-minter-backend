const bucketName = 'klip-nft-test'
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-northeast-2'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
// var file = 'aws/s3.js'

// Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// var path = require('path');


function awsS3Upload(buffer, key, cb) {
  const uploadParams = {
    Bucket: bucketName,
     Key: key, 
     Body: buffer, 
     ACL:'public-read'
  };

  // call S3 to retrieve upload file to specified bucket
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
      cb(undefined, err)
    } if (data) {
      console.log("Upload Success", data.Location);
      cb(data, undefined)
    }
  });
}

module.exports = {
  awsS3Upload
}
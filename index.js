const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.Access_ID,
    secretAccessKey: process.env.Secret_Access_Key,
});

// ---lists all the buckets available---
const listBuckets = (s3) => {
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
        }
    });
}
listBuckets(s3);

// ---creates a bucket with a unique name---
const createBucket = (bucketName) => {
    // Create the parameters for calling createBucket
    var bucketParams = {
        Bucket: bucketName
    };    // call S3 to create the bucket
    s3.createBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Location);
        }
    });
}
createBucket('nodejs-s3bucket-aman');

// ---upload a object(file) in bucket---
const uploadObj = (filePath,bucketName,keyName) => {
    var fs = require('fs');
    // Read the file
    const file = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: bucketName, // Bucket into which you want to upload file
        Key: keyName, // Name by which you want to save it
        Body: file // Local file 
    };

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};
uploadObj('C:/Users/AMAN/Desktop/textFile.txt','nodejs-s3bucket-aman','textFile.txt');

// ---list object(file) present in bucket---
const listObj = (bucketName) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : bucketName,
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}
listObj('nodejs-s3bucket-aman');

// ---delete a object(file) in bucket---
const deleteObj = (bucketName,keyName) => {
  
    // Setting up S3 delete parameters
    const deleteParams = {
        Bucket: bucketName, // Bucket into which you want to delete file
        Key: keyName, // Name by which you want to delete
    };

    s3.deleteObject(deleteParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Deleted Successfully");
        }
    });
};
deleteObj('nodejs-s3bucket-aman','textFile.txt');

// ---delete a bucket with its name---
const deleteBucket = (bucketName) => {
    // Create params for S3.deleteBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // Call S3 to delete the bucket
    s3.deleteBucket(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}
deleteBucket('nodejs-s3bucket-aman');
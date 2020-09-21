"use strict";
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

function GetSignedUrl(event, context, callback) {
  const inputData = JSON.parse(event.body);
  if (inputData.file_name == null) {
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plan" },
      body: "The data input was incorrect",
    });
    return;
  }

  const bucket = "whatsapp-service-csvs";
  const key = event.body.file_name;
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      url: url
    })
  };

  callback(null, response);
}


module.exports.get_signed = GetSignedUrl;
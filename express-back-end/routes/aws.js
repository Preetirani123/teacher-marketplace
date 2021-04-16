const express = require("express");
const router = express.Router();
const { getProducts, insertProduct, updateProduct, deleteProduct, getProduct } = require('./helperFunctions');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');


AWS.config.update({
  accessKeyId: 'AKIAZJTBZSBYWBCVHLMW',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'tm-admin',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

module.exports = () => {


  router.post('/', (request, response) => {

    const form = new multiparty.Form();

    console.log(form)
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response.status(500).send(error);
      };
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const fileName = `bucketFolder/${Date.now().toString()}`;
        const data = await uploadFile(buffer, fileName, type);
        
        return response.status(200).send(data);
      } catch (err) {
        return response.status(500).send(err);
      }
    });
  });
    

    return router;
};    


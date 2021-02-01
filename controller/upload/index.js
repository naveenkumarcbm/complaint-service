const multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  keyFilename: process.env.FIRE_BASE_SERVER_KEY,
});
const bucketName = "complaint-logs";

const uploadFile = async (filename) => {
  await storage.bucket(bucketName).upload(filename, {
    gzip: true,

    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
  console.log(`${filename} uploaded to ${bucketName}.`);
};

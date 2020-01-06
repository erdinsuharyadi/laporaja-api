require('dotenv/config')
const { config, uploader } = require('cloudinary').v2

const cloudinaryConfig = (req, res, next) => { 
  config({
    cloud_name: process.env.CLDNRY_NAME,
    api_key: process.env.CLDNRY_KEY,
    api_secret: process.env.CLDNRY_SECRET
  });
  next();
}

module.exports = {cloudinaryConfig, uploader}
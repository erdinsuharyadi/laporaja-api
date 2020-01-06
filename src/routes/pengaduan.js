const express = require('express')
const Route = express.Router()

const { addPengaduan, getPengaduanByIdUser, getPengaduanByIdPengaduan } = require('../controller/pengaduan')
const { multerUploads } = require('../helpers/multer')
const { cloudinaryConfig } = require('../config/cloudinary')

Route
  .use('*', cloudinaryConfig)
  .post('/', multerUploads.single('photo'), addPengaduan)
  .get('/user/:iduser', getPengaduanByIdUser)
  .get('/id/:idpengaduan', getPengaduanByIdPengaduan)
  
module.exports = Route  
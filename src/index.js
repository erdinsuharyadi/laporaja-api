const express = require('express')
const Route = express.Router()

const auth = require('./routes/auth')
const pengaduan = require('./routes/pengaduan')

Route
  .use('/auth', auth)
  .use('/pengaduan', pengaduan)
  
  
module.exports = Route
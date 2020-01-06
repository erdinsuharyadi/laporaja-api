const express = require('express')
const Route = express.Router()

const { addRegistration, proLogin, getUserNoHp, proLogout } = require('../controller/auth')

Route
  .post('/signup', addRegistration)
  .post('/signin', proLogin)
  .get('/:nohp', getUserNoHp)
  .delete('/logout', proLogout)
  
module.exports = Route  
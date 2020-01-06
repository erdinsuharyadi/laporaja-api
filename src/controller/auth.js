require('dotenv/config')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const moment =  require('moment')
const { response } = require('../helpers/helper')
const authModel = require('../model/auth')
const { validateLogin } = require('../helpers/auth')

module.exports = {
  addRegistration: (req, res) => {
    const { noHp, password, fullName, noKtp, address, level  } = req.body

    let hash = bcrypt.hashSync(password, 10);
    const idUser = uuid()
    const token = jwt.sign({id_user: idUser, no_hp: noHp, level: level }, process.env.JWT_KEYS, { expiresIn: process.env.JWT_EXP })
    
    const data = {
      id_user: idUser,
      no_hp: noHp,
      password: hash,
      full_name: fullName,
      no_ktp: noKtp,
      address,
      photo: 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577793878/hiringapp/assets/avatar.jpg',
      token,
      level,
      status: '0',
      createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }

    authModel.addRegistration(data)
      .then(result => {
       
          result = {
            message: "Registration successful",
            token: token
          }
          response(res, 200, result)
        
      })
      .catch(err => {
        result = {
          message : 'Registration failed',
        }
        response(res, 400, result)
      })
  },
  proLogin: async (req, res) => {
    const data = {
      no_hp: req.body.noHp,
      password: req.body.password
    }
    
    try {
      let UserData = await authModel.getUsername(data.no_hp)
      await validateLogin(res, data, UserData)      
    } catch (error) {
      response(res, 501, error)      
    }
  },
  proLogout:(req, res) => {
    const token = req.headers['x-access-token']
    
    
    var decoded = jwt_decode(token);
    const idUser = decoded.id_user

    const updateDt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

    authModel.outTokenDb(idUser, updateDt)
    .then(result => {
      result = {
        Msg: "Logout Successfully!"
      }
      response(res, 200, result)
    })
    .catch(err => {
      err = {
        Msg: "Failed to logout",
      }
      response(res, 400, err)
    })
  },
  getUserNoHp: (req, res) => {
    const nohp = req.params.nohp
    
    authModel.getUserNoHp(nohp)
    .then(result => {
      result = {
        id_user: result[0].id_user,
        no_hp: result[0].no_hp,
        full_name: result[0].full_name,
        no_ktp: result[0].no_ktp,
        address: result[0].address,
        photo: result[0].photo,
        token: result[0].token,
        level: result[0].level
      }
      response(res, 200, result)
    })
    .catch(err => {
      response(res, 500, err)
    })
  },
}
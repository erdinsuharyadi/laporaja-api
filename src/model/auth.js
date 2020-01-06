const pool = require('../config/db')

module.exports = {
  addRegistration: (data) => {
    return new Promise ((resolve, reject) => {
      pool.query('INSERT INTO tb_user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getUsername: (nohp) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM tb_user WHERE no_hp = ?', nohp, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  saveToken: (token, noHp, updateDt) => {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE tb_user SET token = '${token}', status = '1', updatedAt = '${updateDt}' WHERE no_hp = '${noHp}' `, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getUserNoHp: (nohp) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM tb_user WHERE no_hp = ${nohp}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }  
      })
    })
  },
  outTokenDb: (idUser, updateDt) => {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE tb_user SET token = null, status = '0', updatedAt = '${updateDt}' WHERE id_user = '${idUser}' `, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
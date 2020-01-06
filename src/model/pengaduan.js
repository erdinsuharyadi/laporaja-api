const pool = require('../config/db')

module.exports = {
  addPengaduan: (data) => {
    return new Promise ((resolve, reject) => {
      pool.query('INSERT INTO tb_pengaduan SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPengaduanByIduser: (iduser) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM tb_pengaduan WHERE id_user = ?', iduser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPengaduanByIdPengaduan: (idpengaduan) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM tb_pengaduan WHERE id_pengaduan = ?', idpengaduan, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}  

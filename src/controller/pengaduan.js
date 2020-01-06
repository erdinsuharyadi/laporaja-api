const { response } = require('../helpers/helper')
const jwt_decode = require('jwt-decode')
const moment = require('moment')
const pengaduanModel = require('../model/pengaduan')
const { uploader } = require('../config/cloudinary');
const { dataUri } = require('../helpers/multer');

module.exports = {
  addPengaduan: (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt_decode(token);
    const idUser = decoded.id_user

    if (req.file) {
      const file = dataUri(req).content;
      uploader.upload(file,{folder: "laporaja/pengaduan"}
    ).then((result) => {
       
       
      const { deskripsi, lokasi, jenis_ajuan } = req.body
      const data =  {
        deskripsi,
        lokasi,
        photo : result.url,
        jenis_ajuan,
        status: '1',
        id_user: idUser,
        createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      }
      pengaduanModel.addPengaduan(data)
        .then(result => {
          if (result.affectedRows == 1) {
            result = {
              message: 'Pengaduan berhasil disubmit'
            }
            response(res, 200, result)
          }
          
        })
        .catch(err => {
          err={message: "Failed input to database!"}
          response(res, 400, err)
        })

      })
      .catch((err) => res.status(400).json({
        messge: 'someting went wrong while processing your request',
        data: {
          err
        }
      }))
    } else {
      response(res, 400, {message:"no req file"})
    }
  },
  getPengaduanByIdUser: (req, res) => {
    const iduser = req.params.iduser
    pengaduanModel.getPengaduanByIduser(iduser)
    .then(result => {
      response(res, 200, result)
    })
    .catch(err => {
      response(res, 400, {message:"Get data failed!"})
    })
  },
  getPengaduanByIdPengaduan: (req, res) => {
    const idpengaduan = req.params.idpengaduan
    pengaduanModel.getPengaduanByIdPengaduan(idpengaduan)
    .then(result => {
      response(res, 200, result)
    })
    .catch(err => {
      response(res, 400, {message:"Get data failed!"})
    })
  },
}
require("dotenv/config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("../helpers/helper");
const loginModel = require("../model/auth");
const moment = require("moment");

module.exports = {
  validateLogin: (res, reqData, UserData) => {
    if (UserData.length != 0) {
      let passFromReq = reqData.password;
      let passFromSql = UserData[0].password;

      if (bcrypt.compareSync(passFromReq, passFromSql)) {
        const tokenDb = jwt.sign(
          {
            id_user: UserData[0].id_user,
            no_hp: UserData[0].no_hp,
            level: UserData[0].level
          },
          process.env.JWT_KEYS,
          { expiresIn: process.env.JWT_EXP }
        );
        let updateDt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

        loginModel.saveToken(tokenDb, UserData[0].no_hp, updateDt);

        return response(res, 200, {
          success: true,
          message: "Authentication successful!",
          token: tokenDb,
          level: UserData[0].level
        });
      } else {
        return response(res, 400, {
          success: false,
          message: "Authentication failed, please cek your request!"
        });
      }
    } else {
      return response(res, 401, {
        success: false,
        message: "Wrong Username or Password!"
      });
    }
  }
};

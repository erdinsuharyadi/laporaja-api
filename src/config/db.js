require('dotenv/config')
const mysql = require('mysql')

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

pool.connect((err) => {
  if(err) console.log(err)
  console.log('Database Connected!')
})

module.exports = pool
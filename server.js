require('dotenv/config')
const server = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT
const { response } = require('./src/helpers/helper')
const route = require('./src/index')
const cors = require('cors')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))
server.use(morgan('dev'))
server.use(cors())

server.listen(PORT, () => {
  console.log(`This server is running ${PORT}`)
})

server.get('/', (req, res) => {
  response(res, 200, "Hello from the laporaja RESTful side!")
})

server.use('/', route)

module.exports = server
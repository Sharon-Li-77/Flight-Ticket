import express from 'express'
import { engine } from 'express-handlebars'
import {
  // getMyTickets,
  // getMyTicketsByDob,
  // countMyTicketsByDob,
  // countMyLostLuggage,
  // sumMyLostLuggageWeight,
  // getMyLostLuggageLocation,
  getAllTicketInformation,
} from './db/index.js'

import * as Path from 'node:path/posix'
import * as URL from 'node:url'

const server = express()
export default server

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.engine('hbs', engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.join(__dirname, 'views'))
server.use(express.static(Path.join(__dirname, '..', 'public')))

server.get('/:passengerNumber', async (req, res) => {
  let number = Number(req.params.passengerNumber)
  console.log(number)
  const ticketDate = await getAllTicketInformation(number)
  console.log('data', ticketDate)
  res.render('ticket', ticketDate)
})

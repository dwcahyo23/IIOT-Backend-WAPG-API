import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import logger from 'morgan'
import routes from './api/routes'
import scheduler from './apps/scheduler'

dotenv.config()

const app = express()
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.render('index', { title: 'Whatsapp API' })
})
routes(app)
// scheduler.getScheduler()

// handle uncaught exceptions
process.on('uncaughtException', function (error) {
  console.log('Error', error.message)
})

app.listen(process.env.PORT_APP, () =>
  console.log(`Server up & running in ${process.env.PORT_APP}`),
)

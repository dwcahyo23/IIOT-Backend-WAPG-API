import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import logger from 'morgan'
import routes from './api/routes'
import MntnWo from './apps/Mntn-Wo'

dotenv.config()

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routes(app)

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})

MntnWo.getUpdate().then((res) => console.log(res))

app.listen(process.env.PORT_APP, () =>
  console.log(`Server up & running in ${process.env.PORT_APP}`),
)

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import routes from './api/routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routes(app)

app.listen(process.env.PORT_APP, () =>
  console.log(`Server up & running in ${process.env.PORT_APP}`),
)

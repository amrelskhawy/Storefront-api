import express, { Request, Response } from 'express'
import config from './config'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(config.port, function () {
    console.log(`starting app on: ${address}`)
})

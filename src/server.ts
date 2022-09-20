import { errorMiddleWare } from './middlewares/error.middleware';
import express, { Request, Response } from 'express'
import config from './config'
import bodyParser from 'body-parser'
import apiRoutes from './routes'

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.use('/api',apiRoutes)

app.get('/', function (req: Request, res: Response) {
    res.json({title:'STOREFRONT BACKEND', instructions: 'nav to localhost:3000/api/users or /api/products or /api/orders , when you are Already Authenticate!!'})
})

// Handling Errors
app.use(errorMiddleWare)

app.listen(config.port, function () {
    console.log(`starting app on: ${address}`)
})


export default app

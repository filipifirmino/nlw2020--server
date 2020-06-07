//Import
import express, { request, response } from 'express'
import cors from 'cors'
import path from 'path'
import routes from '../routes'
//Main
const app = express()
//Json component
app.use(express.json())
//Import routes
app.use(routes)

app.use(cors())
//Static files
app.use('/asset', express.static(path.resolve(__dirname, '..','asset'))) 

//port listen
app.listen(3333);




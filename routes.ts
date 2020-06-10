//import
import express, { response, request } from 'express'
import PointsController from './src/controllers/PointsController'
import ItemsController from './src/controllers/ItemsController'
import multer from 'multer'
import multerConfig from './src/config/multer'

//Main router or create
const routes = express.Router();
const pointsController = new PointsController()
const itemsController = new ItemsController()

const upload = multer(multerConfig)
//Router

routes.get('/', (request, response)=>{
    return response.send('<h1>Dev Sistems</h1>')
})
routes.get('/items', itemsController.listItems)

routes.get('/points',pointsController.index)

routes.post('/points',upload.single('image') ,pointsController.create)

routes.get('/points/:id', pointsController.show)


//Exporte for everone app
export default routes
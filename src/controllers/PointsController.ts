//import
import {Request, Response} from 'express'
import knex from '../database/connection'


class PointsController{
    // Show all data Collect point
    async index(request:Request, response:Response){
        const {city,uf,items} = request.query
        const parsedItems = String(items).split(',').map(item=>Number(item.trim()))
        
        const points = await knex('points')
        .join('point_items','points.id','=','point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*')

        const serializedItems = points.map(point=> {
            return{
                ...point,
                image_url: `http://192.168.15.185:3333/${point.image}`
            }
        })

        return response.json(serializedItems)
    }
    //Show data only a collect point
    async show(request:Request, response:Response){
        const id_point = request.params.id

        const point =  await knex('points').where('id', id_point).first()
        
        if(!point){
            return response.status(400).json({message:'Point not fund.'})
        }

        const serializedPoint = {
                ...point,
                image_url:`http://192.168.15.185:3333/${point.image}`
            
        }

        const items  = await knex('items')
        .join('point_items','items.id', '=','point_items.item_id')
        .where('point_items.point_id',id_point)
        .select('items.title')

        return  response.json({point: serializedPoint, items})
    }
    //Create Collect point
    async create (request:Request,response:Response){
        const{
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            number,
            uf,
            items
        } = request.body
    
        const trx = await knex.transaction()
        const point =  {
            image:request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            number,
            uf
        }
        const ids = await trx('points').insert(point)
        const point_id = ids[0]
        const pointItems = items
        .split(',')
        .map((item:string) => Number(item.trim()))
        .map((item_id:number)=>{


            return{
                item_id,
                point_id
            }
        })
        await trx('point_items').insert(pointItems)
        
        //Insert on db whith trx
        await trx.commit()

        //Return all data do created point    
        return response.json({id:point_id,...point})
    }

}

export default PointsController
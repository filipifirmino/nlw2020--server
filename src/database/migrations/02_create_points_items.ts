import Knex from 'knex'; //Tipos não primitivos

export async function up(knex:Knex){
    //Create tables
    return knex.schema.createTable('point_items', table=>{
        table.increments('id').primary()
        //Foreign key
        table.integer('point_id')
            .notNullable()
            .references('id') //Reference
            .inTable('points') //Reference table

     
        table.integer('item_id')
            .notNullable()
            .references('id') //Reference colun in table
            .inTable('items') //Referecne table
        
    })
}

export async function down(knex:Knex) {
    //Remove tables
    return knex.schema.dropTable('point_items') 
}
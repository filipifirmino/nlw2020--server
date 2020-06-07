import Knex from 'knex'; //Tipos não primitivos

export async function up(knex:Knex){
    //Create tables
    return knex.schema.createTable('items', table=>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('title').notNullable()
        
    })
}

export async function down(knex:Knex) {
    //Remove tables
    return knex.schema.dropTable('items') 
}
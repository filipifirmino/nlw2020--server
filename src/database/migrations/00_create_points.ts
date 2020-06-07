import Knex from 'knex'; //Tipos não primitivos

export async function up(knex:Knex){
    //Create tables
    return knex.schema.createTable('points', table=>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.integer('number')
        table.string('uf',2).notNullable()
    })
}

export async function down(knex:Knex) {
    //Remove tables
    return knex.schema.dropTable('points') 
}
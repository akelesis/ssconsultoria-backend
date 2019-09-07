exports.up = function(knex, Promise) {
    return knex.schema.createTable('houses-pics', housesPics => {
        housesPics.increments('idPic').primary()
        housesPics.integer('idHouse').notNull().unsigned()
        housesPics.string('url').notNull()
        housesPics.foreign('idHouse').references('id').inTable('houses')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('houses-pics')
};


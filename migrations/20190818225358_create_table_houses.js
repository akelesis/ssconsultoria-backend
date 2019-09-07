exports.up = function (knex, Promise) {
	return knex.schema.createTable('houses', houses => {
		houses.increments('id').primary()
		houses.integer('idClient').notNull().unsigned()
		houses.string('title').notNull()
		houses.string('description').notNull()
		houses.float('price')
		houses.string('type') //apartment, house, terrain...
		houses.string('area') // urban or rural
		houses.string('transaction') // rent or sell
		houses.integer('neighborhood').notNull().unsigned()
		houses.boolean('highlights').notNull().defaultTo(false)
		houses.foreign('neighborhood').references('id').inTable('neighborhoods')
		houses.foreign('idClient').references('id').inTable('clients')
	})
};


exports.down = function (knex, Promise) {
	return knex.schema.dropTable('houses')
};

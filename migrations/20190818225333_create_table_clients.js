exports.up = function (knex, Promise) {
    return knex.schema.createTable('clients', clients => {
        clients.increments('id').primary()
        clients.string('name').notNull()
        clients.string('email').notNull()
        clients.string('telephone').notNull
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('clients')
};

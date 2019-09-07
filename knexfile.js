module.exports = {

	client: 'mysql',
	connection: {
		database: 'ssconsultoria',
		user: 'root',
		password: ''
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}

};

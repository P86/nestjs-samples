const path = require('path');

module.exports = {
  client: 'pg',
  version: '13.1',

  connection: {
    //host: process.env.DATABASE_HOST,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'default',
    port: 5432,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: './seeds',
  },
}

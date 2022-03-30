require('dotenv').config()

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// Update with your config settings.

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: 'utc'
    },
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'migrations',
      schemaName: process.env.DB_SCHEMA
    },

  },

  staging: {
    client: '',
    connection: {
      database: '',
      user: '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: ''
    }
  },

  production: {
    client: '',
    connection: {
      database: '',
      user: '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: ''
    }
  }

}

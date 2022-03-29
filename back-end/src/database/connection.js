const { knex } = require('knex')
const CONFIG = require('../../knexfile')

module.exports = () => {
  return knex(CONFIG[process.env.NODE_ENV || 'development'])
}

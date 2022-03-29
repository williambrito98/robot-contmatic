/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('tactus').createTable('users', (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.string('email').notNullable()
    table.timestamps(true, true, false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}

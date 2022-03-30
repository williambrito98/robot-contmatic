/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('tactus').createTable('schedule', (table) => {
        table.increments('id')
        table.dateTime('date')
        table.string('servidor')
        table.text('codigos')
        table.string('anos', 200)
        table.string('meses', 200)
        table.timestamps(true, true, false)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema('tactus').dropTable('schedule')
};

export function up(knex) {
  return knex.schema.createTable('luggage', (table) => {
    table.increments('id').primary()
    table.integer('ticket_id').references('tickets.id')
    table.integer('weight')
    table.boolean('unclaimed')
    table.integer('found_airtport_id').references('airports.id')
    table.boolean('is_suspicious')
  })
}

export function down(knex) {
  return knex.schema.dropTable('luggage')
}

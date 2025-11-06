// migrations/20251106_create_projects.js
/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('projects', (table) => {
      table.uuid('id_project').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.string('description');
      table.string('repository').notNullable();
      table.uuid('created_by')
        .notNullable()
        .references('id_user')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
  };
  
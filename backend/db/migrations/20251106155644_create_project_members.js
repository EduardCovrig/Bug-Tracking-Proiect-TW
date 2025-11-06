// migrations/20251106_create_project_members.js
/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('project_members', (table) => {
      table.uuid('id_user').notNullable()
        .references('id_user').inTable('users')
        .onDelete('CASCADE');
      table.uuid('id_project').notNullable()
        .references('id_project').inTable('projects')
        .onDelete('CASCADE');
      table.enum('role', ['PM', 'TST']).notNullable().defaultTo('TST');
      table.primary(['id_user', 'id_project']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_members');
  };
  
// migrations/20251106_create_users.js
/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.uuid('id_user').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(false, true); // created_at și updated_at automat
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
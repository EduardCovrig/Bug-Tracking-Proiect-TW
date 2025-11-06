// migrations/20251106_create_bugs.js
/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('bugs', (table) => {
      table.uuid('id_bug').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('id_project').notNullable()
        .references('id_project').inTable('projects')
        .onDelete('CASCADE');
      table.uuid('reported_by')
        .references('id_user').inTable('users')
        .onDelete('SET NULL');
      table.uuid('assigned_to')
        .references('id_user').inTable('users')
        .onDelete('SET NULL');
      table.enu('severity', ['low', 'medium', 'high', 'critical']).notNullable();
      table.enu('priority', ['low', 'medium', 'high']).notNullable();
      table.text('description').notNullable();
      table.string('commit_link').notNullable();
      table.string('resolved_commit');
      table.enu('status', ['open', 'in_progress', 'resolved', 'closed']).notNullable().defaultTo('open');
      table.timestamp('reported_at').notNullable().defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bugs');
  };
  
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Trades extends BaseSchema {
  protected tableName = 'trades';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.bigInteger('user_id');
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade');

      table.string('action', 4);
      table.string('product', 10);
      table.decimal('profit');
      table.decimal('entry_price');
      table.decimal('exit_price');
      table.text('description');

      table.timestamps(true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}

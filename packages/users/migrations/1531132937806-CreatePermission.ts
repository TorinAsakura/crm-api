import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreatePermission1531132937806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'permission',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'resource',
          type: 'varchar',
        },
        {
          name: 'action',
          type: 'varchar',
        },
        {
          name: 'possession',
          type: 'varchar',
          default: `'any'`,
        },
        {
          name: 'attributes',
          type: 'text',
          default: `''`,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }), true)

    await queryRunner.createIndex('permission', new TableIndex({
      name: 'IDX_UNIQUE_PERMISSION',
      columnNames: ['resource', 'action', 'possession', 'attributes'],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('permission')
  }
}

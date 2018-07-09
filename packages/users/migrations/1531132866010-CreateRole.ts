import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRole1531132866010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'role',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'name',
          type: 'varchar',
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

    await queryRunner.createForeignKey('user', new TableForeignKey({
      columnNames: ['roleId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'role',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('role')
  }
}

import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm'

export class CreateUserPermissions1531133269196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'user_permissions_permission',
      columns: [
        {
          name: 'userId',
          type: 'int',
        },
        {
          name: 'permissionId',
          type: 'int',
        },
      ],
    }), true)

    await queryRunner.createPrimaryKey('user_permissions_permission', ['userId', 'permissionId'])

    await queryRunner.createForeignKey('user_permissions_permission', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }))

    await queryRunner.createForeignKey('user_permissions_permission', new TableForeignKey({
      columnNames: ['permissionId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'permission',
      onDelete: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_permissions_permission')
  }
}

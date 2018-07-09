import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class CreateRolePermissions1531133281022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'role_permissions_permission',
      columns: [
        {
          name: 'roleId',
          type: 'int',
        },
        {
          name: 'permissionId',
          type: 'int',
        },
      ],
    }), true)

    await queryRunner.createPrimaryKey('role_permissions_permission', ['roleId', 'permissionId'])

    await queryRunner.createForeignKey('role_permissions_permission', new TableForeignKey({
      columnNames: ['roleId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'role',
      onDelete: 'CASCADE',
    }))

    await queryRunner.createForeignKey('role_permissions_permission', new TableForeignKey({
      columnNames: ['permissionId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'permission',
      onDelete: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('role_permissions_permission')
  }
}

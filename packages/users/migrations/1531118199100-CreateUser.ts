import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUser1531118199100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TYPE user_status_enum AS ENUM ('ACTIVE', 'DISABLED');`)

    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'firstName',
          type: 'varchar',
        },
        {
          name: 'lastName',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'status',
          type: 'user_status_enum',
          default: `'ACTIVE'`,
        },
        {
          name: 'roleId',
          type: 'int',
          isUnique: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user')
    await queryRunner.query(`DROP TYPE user_status_enum;`)
  }
}

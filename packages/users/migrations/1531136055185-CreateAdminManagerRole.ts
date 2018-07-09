import { MigrationInterface, QueryRunner } from 'typeorm'
import { Permission } from '../src/entities/Permission'
import { Role } from '../src/entities/Role'

export class CreateAdminManagerRole1531136055185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const permissions = await queryRunner.manager.find(Permission)

    await queryRunner.manager.save(
      await queryRunner.manager.create(Role, { 
        name: 'Admin Manager', 
        permissions,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }
}

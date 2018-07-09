import { MigrationInterface, QueryRunner } from 'typeorm'
import { Permission } from '../src/entities/Permission'

export class CreateRolesPermissions1531135781629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.insert(Permission, { 
      resource: 'roles', 
      action: 'create',
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'roles', 
      action: 'read',
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'roles', 
      action: 'update',
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'roles', 
      action: 'delete',
    })
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }
}

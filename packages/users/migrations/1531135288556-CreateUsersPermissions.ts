import { MigrationInterface, QueryRunner } from 'typeorm'
import { Permission } from '../src/entities/Permission'

export class CreateUsersPermissions1531135288556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.insert(Permission, { 
      resource: 'users', 
      action: 'create',
      attributes: ['*'],
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'users', 
      action: 'read',
      attributes: ['*'],
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'users', 
      action: 'update',
      attributes: ['*'],
    })

    await queryRunner.manager.insert(Permission, { 
      resource: 'users', 
      action: 'delete',
      attributes: ['*'],
    })
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }
}

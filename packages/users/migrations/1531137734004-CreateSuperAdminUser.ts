import { MigrationInterface, QueryRunner } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Role } from '../src/entities/Role'
import { User } from '../src/entities/User'

export class CreateSuperAdminUser1531137734004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const role = await queryRunner.manager.findOne(Role)

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('Supersecret5', salt)

    await queryRunner.manager.save(
      await queryRunner.manager.create(User, { 
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@bloomcrm.net',
        password,
        role,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }
}

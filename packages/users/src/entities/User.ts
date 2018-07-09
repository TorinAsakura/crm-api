import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm'
import { AggregateRoot } from '@nestjs/cqrs'
import { AccessControl } from 'accesscontrol'
import { UserStatus } from '../enums'
import { Permission } from './Permission'
import { Role } from './Role'

@Entity()
export class User extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string | null

  @Column('enum', { enum: UserStatus })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(type => Role)
  @JoinColumn()
  role: Role

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[]

  getAccessControl() {
    return new AccessControl([
      ...this.getUserPermissions(),
      ...this.getRolePermissions(),
    ])
  }

  private getUserPermissions() {
    return this.permissions.map(permission => ({
      role: 'USER_PERMISSIONS',
      resource: permission.resource,
      action: permission.action,
      possession: permission.possession,
      attributes: permission.attributes,
    }))
  }

  private getRolePermissions() {
    if (!this.role) {
      return []
    }

    return this.role.permissions.map(permission => ({
      role: 'USER_PERMISSIONS',
      resource: permission.resource,
      action: permission.action,
      possession: permission.possession,
      attributes: permission.attributes,
    }))
  }
}

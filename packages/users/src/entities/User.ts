import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm'
import { AggregateRoot } from '@nestjs/cqrs'
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
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { AggregateRoot } from '@nestjs/cqrs'
import { Permission } from './Permission'

@Entity()
export class Role extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[]
}

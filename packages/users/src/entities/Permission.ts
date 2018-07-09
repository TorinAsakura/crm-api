import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { AggregateRoot } from '@nestjs/cqrs'

@Entity()
export class Permission extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  resource: string

  @Column()
  action: string

  @Column({ default: 'any' })
  possession: string = 'any'

  @Column('simple-array')
  attributes: string[] = []

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

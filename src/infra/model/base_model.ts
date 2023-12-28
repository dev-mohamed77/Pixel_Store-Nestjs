import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../application/core/base/base_entity';

@Entity()
export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: new Date(Date.now()) })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  // @BeforeInsert()
  // setCreatedAt() {
  //   this.createdAt = moment().tz('Africa/Cairo', true).toDate();
  // }
}

import { BaseModel } from './base_model';
import { UserEntity } from '../../domain/entities/users.entity';
import { RolesApp } from '../../application/config/enum/roles_enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseModel implements UserEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 200 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: RolesApp, default: RolesApp.user })
  role: RolesApp;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  passwordResetCode: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @Column({ type: 'boolean', nullable: true })
  passwordResetVerified: boolean;
}

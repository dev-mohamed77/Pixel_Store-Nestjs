import BaseEntity from '../../application/core/base/base_entity';
import { RolesApp } from '../../application/config/enum/roles_enum';
import { Exclude } from 'class-transformer';

export class UserEntity extends BaseEntity {
  name?: string;
  email?: string;

  @Exclude()
  password?: string;

  phone: string;
  role?: RolesApp; // enum (user, admin, manager)
  country?: string;
  email_verified?: boolean;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified?: boolean;
  // address1?: string;
  // address2?: string;
  // city?: string;
  // state?: string;
  // country?: string;
  // postal_code?: string;

  constructor(params: Partial<UserEntity>) {
    super();
    Object.assign(this, params);
  }
}

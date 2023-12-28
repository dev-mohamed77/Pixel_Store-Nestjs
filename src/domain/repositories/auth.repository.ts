import { UserEntity } from '../entities/users';

export abstract class IAuthRepository {
  abstract createUser(user: UserEntity): Promise<UserEntity>;

  abstract getUserOne(params: Partial<UserEntity>): Promise<UserEntity>;

  abstract updateUser(
    id: string,
    params: Partial<UserEntity>,
  ): Promise<UserEntity>;
}

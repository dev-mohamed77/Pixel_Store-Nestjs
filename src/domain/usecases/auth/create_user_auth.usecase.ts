import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { UserEntity } from 'src/domain/entities/users';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';

export class CreateUserAuthUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IAuthRepository) {}

  execute(user: UserEntity): Promise<UserEntity> {
    return this.repo.createUser(user);
  }
}

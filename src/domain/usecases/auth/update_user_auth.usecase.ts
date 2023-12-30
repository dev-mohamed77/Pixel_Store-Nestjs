import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { UserEntity } from 'src/domain/entities/users.entity';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';

export class UpdateUserAuthUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IAuthRepository) {}

  execute(id: string, params: Partial<UserEntity>): Promise<UserEntity> {
    return this.repo.updateUser(id, params);
  }
}

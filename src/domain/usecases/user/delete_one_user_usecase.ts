import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from 'src/domain/entities/users.entity';

export class DeleteOneUserUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: IUserRepository) {}

  execute(filter: Partial<UserEntity>): Promise<boolean> {
    return this.repo.deleteOne(filter);
  }
}

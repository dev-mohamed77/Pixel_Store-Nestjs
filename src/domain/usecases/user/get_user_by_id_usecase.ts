import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionModel } from 'src/application/core/model/option.model';
import { UserEntity } from 'src/domain/entities/users.entity';

export class GetUserByIDUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(option: FindOneByIdOptionModel<UserEntity>): Promise<UserEntity> {
    return this.repo.findById(option);
  }
}

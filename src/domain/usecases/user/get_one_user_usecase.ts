import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionModel } from 'src/application/core/model/option.model';
import { UserEntity } from 'src/domain/entities/users.entity';

export class GetOneUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(option: FindOneOptionModel<UserEntity>): Promise<UserEntity> {
    return this.repo.findOne(option);
  }
}

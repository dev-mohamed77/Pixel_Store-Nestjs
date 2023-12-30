import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UpdateOptionModel } from 'src/application/core/model/option_typeorm.model';
import { UserEntity } from 'src/domain/entities/users.entity';

export class UpdateUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(param: UpdateOptionModel<UserEntity>): Promise<UserEntity> {
    return this.repo.update(param);
  }
}

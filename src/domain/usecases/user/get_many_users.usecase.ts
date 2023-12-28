import { UserEntity } from 'src/domain/entities/users';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionModel } from 'src/application/core/model/option.model';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class GetManyUsersUseCase
  implements IBaseUseCase<[UserEntity[], number]>
{
  constructor(private repo: IUserRepository) {}

  execute(
    option: FindAllOptionModel<UserEntity>,
  ): Promise<[UserEntity[], number]> {
    return this.repo.findMany(option);
  }
}

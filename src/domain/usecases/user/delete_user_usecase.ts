import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteUserUseCase implements IBaseUseCase<boolean> {
  constructor(private repo: IUserRepository) {}

  execute(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

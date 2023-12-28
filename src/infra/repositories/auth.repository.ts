import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { UserEntity } from '../../domain/entities/users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.model';

export class AuthRepositoryImp implements IAuthRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(user: UserEntity) {
    const newUser = await this.repo.create(user);

    return this.repo.save(newUser, {
      reload: true,
    });
  }

  getUserOne(params: Partial<UserEntity>) {
    return this.repo.findOneBy(params);
  }

  async updateUser(
    id: string,
    params: Partial<UserEntity>,
  ): Promise<UserEntity> {
    await this.repo.update(id, params);

    return this.repo.findOneBy({ id });
  }
}

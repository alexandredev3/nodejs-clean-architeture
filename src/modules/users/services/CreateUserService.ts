import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository';

import User from '@modules/users/infrastructure/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
}

@injectable()
class CreateUserService {

  private usersRepository: IUserRepository;

  constructor(

    @inject('UsersRepository')
    usersRepository: IUserRepository,

  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password, bio }: IRequest): Promise<User> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new Error('Email address already used.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      encrypted_password: password,
      bio
    });

    return user;
  }

}

export default CreateUserService;
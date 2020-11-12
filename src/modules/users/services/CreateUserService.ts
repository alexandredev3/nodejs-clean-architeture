import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infrastructure/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
}

// permite que as dependencias dessa classe seja injetada em tempo de execução.
@injectable()
class CreateUserService {

  private usersRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(

    @inject('UsersRepository')
    usersRepository: IUserRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider

    // injetando a dependecia em tempo de execução pelo constructor.

  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    /**
     * Aqui estou armazenando a identificação de uma dependecia e a logica por de trás
     * da sua instanciação.
     */
  }

  public async execute({ name, email, password, bio }: IRequest): Promise<User> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new Error('Email address already used.');
    }

    const hash_password = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      encrypted_password: hash_password,
      bio
    });

    return user;
  }

}

export default CreateUserService;
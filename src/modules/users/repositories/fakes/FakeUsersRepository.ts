import { uuid } from 'uuidv4';

import User from '@modules/users/infrastructure/typeorm/entities/User';

import ICreateUsersRepository from '@modules/users/repositories/ICreateUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements ICreateUsersRepository {
  private users: User[] = [];

  public async create({ 
    name, 
    email, 
    encrypted_password, 
    bio 
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    // colocando todas as propriedades, id, name, email, etc... para dentro do objeto user;
    Object.assign(user, { id: uuid(), name, email, encrypted_password, bio });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(userStored => userStored.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(userStored => userStored.email === email);

    return user;
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = this.users;

    return users;
  }
}

export default FakeUsersRepository;
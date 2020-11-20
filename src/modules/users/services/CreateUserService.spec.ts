import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

import AppError from '@shared/errors/AppError';

let createUserService: CreateUserService;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;
    fakeCacheProvider = new FakeCacheProvider

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Maria',
      email: 'maria@example.com',
      password: 'password',
      bio: 'bio example'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a user with E-mail already taken', async () => {
    await createUserService.execute({
      name: 'joao',
      email: 'joao@example.com',
      password: 'password',
      bio: 'bio example'
    });

    await expect(
      createUserService.execute({
        name: 'joao',
        email: 'joao@example.com',
        password: 'password',
        bio: 'bio example'
      })
    ).rejects.toBeInstanceOf(AppError);
    // Usamos o "rejects" quando o teste for cair em um Error.
  });
})
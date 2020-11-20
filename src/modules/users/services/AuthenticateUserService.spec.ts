import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeCacheProvider;

describe('Authenticate User', () => {

  beforeEach(() => {
    usersRepository = new FakeUsersRepository;
    hashProvider = new FakeHashProvider;
    cacheProvider = new FakeCacheProvider;

    createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider
    )

    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@example.com',
      password: 'password',
      bio: 'bio example'
    });

    const authenticateResponse = await authenticateUserService.execute({
      email: 'pedro@example.com',
      password: 'password'
    });

    expect(authenticateResponse).toHaveProperty('token');
    expect(authenticateResponse.user).toEqual(user); // expero que "authenticateResponse.user" seja igual a user;
  });

  it('should not authenticate a user with an email that does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'mateus@mateus.com',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
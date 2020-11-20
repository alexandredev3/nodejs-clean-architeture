import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let createUserSevice: CreateUserService;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider;
    fakeCacheProvider = new FakeCacheProvider

    createUserSevice = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able create a new user', async () => {
    const user = await createUserSevice.execute({
      name: 'Maria',
      email: 'maria@example.com',
      password: 'password',
      bio: 'bio example'
    });

    expect(user).toHaveProperty('id');
  })
})
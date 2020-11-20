import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

import ListAllUsersService from '@modules/users/services/ListAllUsersService';

let listAllUsersService: ListAllUsersService; 

let usersRepository: FakeUsersRepository;
let cacheProvider: FakeCacheProvider;

describe('List All Users', () => {
  
  beforeEach(() => {
    usersRepository = new FakeUsersRepository;
    cacheProvider = new FakeCacheProvider;

    listAllUsersService = new ListAllUsersService(
      usersRepository,
      cacheProvider
    );
  });

  it('should be able list all users', async () => {
    // com o iterable vamos criar um item por vez.
    /**
     * O iterable vai me retorna 5 posições do Array(length: 5)
     * (_, index) => index: retorna quantas posições foi criado no Array.
     * nesse caso foi criado cinco posições ou seja, será criado 5 usuarios.
     */
    const iterable = Array.from({ length: 5 }, (_, index) => index);

    // criando usuarios baseado no quanto de posições do Array, que a variavel "iterable" retorna.
    const users = await Promise.all(
      // estamos criando o usuario direto no repositorio,
      // porque todos os usuarios vai esta com os mesmos campos,
      // se nos criar direto no service, vai cair em um erro,
      // pois la no service tem validações para não criar usuarios iguais.
      // também para ser rapido o teste.
      iterable.map(async item => 
        usersRepository.create({
          name: `user-${item}`,
          email: 'user-email',
          encrypted_password: 'user-password',
          bio: 'user-bio'
        })
      )
    );

    const allUsers = await listAllUsersService.execute(); 

    expect(allUsers).toEqual([ ...users ]);
  });
})
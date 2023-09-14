import { UserCreatorUserCase } from '@application/useCases/UserCreator'
import { UserDeleterUseCase } from '@application/useCases/UserDeleter'
import { UserGetterUseCase } from '@application/useCases/UserGetter'
import { UserUpdaterUseCase } from '@application/useCases/UserUpdater'
import { User } from '@domain/entities/User'
import { InMemoryUserRepository } from '@infrastructure/implementations/InMemory/InMemoryUserRepository'

// IIFI function, que no necesita ser llamada
(async () => {
  const unMemoryUserRepo = new InMemoryUserRepository()

  // creando usuarios
  const userCreatorCase = new UserCreatorUserCase(unMemoryUserRepo)
  const userToCreate: User[] = [
    {
      id: '1',
      username: 'Codemms',
      name: 'juan',
      age: 25
    },
    {
      id: '2',
      username: 'Infi',
      name: 'juan',
      age: 25
    },
    {
      id: '3',
      username: 'Surviver',
      name: 'jeje',
      age: 25
    }
  ]

  await userCreatorCase.run(userToCreate)

  // obteniendo usuarios
  const userGetterUseCase = new UserGetterUseCase(unMemoryUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // actualizando usuarios
  const userUpdaterUseCase = new UserUpdaterUseCase(unMemoryUserRepo)
  await userUpdaterUseCase.run([
    {
      id: '1',
      username: 'Lapuntuj'
    },
    {
      id: '2',
      username: 'Numpa'
    }
  ])

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  // eliminar usuarios
  const userDeleterUseCase = new UserDeleterUseCase(unMemoryUserRepo)
  await userDeleterUseCase.run('1')

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()

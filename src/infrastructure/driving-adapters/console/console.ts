import { UserCreatorUserCase } from '@application/useCases/UserCreator'
import { UserGetterUseCase } from '@application/useCases/UserGetter'
import { UserUpdaterUseCase } from '@application/useCases/UserUpdater'
import { User } from '@domain/entities/User'
import { InMemoryUserRepository } from '@infrastructure/implementations/InMemory/InMemoryUserRepository'

// IIFI function, que no necesita ser llamada
(async () => {
  const unMemoryUserRepo = new InMemoryUserRepository()

  // creando usuarios
  const userCreatorCase = new UserCreatorUserCase(unMemoryUserRepo)
  const userToCreate: User = {
    id: '1',
    username: 'Codemms',
    name: 'juan',
    age: 25
  }

  await userCreatorCase.run(userToCreate)

  // obteniendo usuarios
  const userGetterUseCase = new UserGetterUseCase(unMemoryUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // actualizando usuarios
  const userUpdaterUseCase = new UserUpdaterUseCase(unMemoryUserRepo)
  await userUpdaterUseCase.run({
    id: '1',
    username: 'Lapuntuj'
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)
})()

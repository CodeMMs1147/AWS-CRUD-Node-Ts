// import { UserGetterUseCase } from "@application/useCases/UserGetter"
import { UserCreatorUserCase } from '@application/useCases/UserCreator'
import { User } from '@domain/entities/User'
import { InMemoryUserRepository } from '@infrastructure/implementations/InMemory/InMemoryUserRepository'

// IIFI function, que no necesita ser llamada
(async () => {
  const unMemoryUserRepo = new InMemoryUserRepository()

  console.log(unMemoryUserRepo.userData)

  const userCreatorCase = new UserCreatorUserCase(unMemoryUserRepo)

  const userToCreate: User = {
    id: '123',
    username: 'Codemms',
    name: 'juan',
    age: 25
  }

  await userCreatorCase.run(userToCreate)
  console.log(unMemoryUserRepo.userData)
  // const userGetterUseCase = new UserGetterUseCase(new InMemoryUserRepository())
  // const users = await userGetterUseCase.run()
  // console.log(users)
})()

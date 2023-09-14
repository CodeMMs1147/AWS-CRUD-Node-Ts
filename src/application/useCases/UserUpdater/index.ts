import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'
import { UserGetterById } from '@domain/services/UserGetterById'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: User[]): Promise<User[]> {
    const usersArray: User[] = []

    for (const usuario of data) {
      const user = await this._userGetterById.run(usuario.id)

      const dataToUpdate: User = {
        id: usuario.id,
        name: usuario.name ?? user.name,
        username: usuario.username ?? user.username,
        age: usuario.age ?? user.age
      }

      const userUpdated: User = await this._userRepository.update(dataToUpdate)
      usersArray.push(userUpdated)
    }

    return usersArray
  }
}

/* eslint-disable @typescript-eslint/quotes */
import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { ExistUserByUserName } from "../../../domain/services/ExistsUserByUserName"
import { UserAlreadyExistsException } from "../../../domain/exceptions/UserAlreadyExistsException"

export class UserCreatorUserCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User[]): Promise<User[]> {
    const usersArray: User[] = []

    for (const usuario of body) {
      const existUser: boolean = await this._existUserByUserName.run(usuario.username!)

      if (existUser) {
        throw new UserAlreadyExistsException()
      }

      const userCreated: User = await this._userRepository.save(usuario)
      usersArray.push(userCreated)
    }

    return usersArray
  }
}

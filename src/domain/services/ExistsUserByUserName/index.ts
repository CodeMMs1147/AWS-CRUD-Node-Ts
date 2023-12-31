import { UserRepository } from '@domain/repositories/UserRepository'

export class ExistUserByUserName {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (username: string): Promise<boolean> {
    const user = await this._userRepository.getUserByUserName(username)

    if (user !== null) return true

    return false
  }
}

import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  readonly userData: User[] = []

  async getAll (): Promise<User[]> {
    // this se usa para obtener el contexto en una clase
    return this.userData
  }

  async save (user: User): Promise<User> {
    this.userData.push(user)
    return user
  }

  async getUserByUserName (username: string): Promise<User | null> {
    const userFound = this.userData.find(usr => usr.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: User): Promise<User> {
    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (id: string): Promise<User | null> {
    return null
  }
}

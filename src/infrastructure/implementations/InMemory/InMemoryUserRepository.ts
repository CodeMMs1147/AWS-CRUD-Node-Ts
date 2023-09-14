import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  // se quita el readonly porque se necesita sobreescribir userData en la funcion update
  private userData: User[] = []

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
    const users = this.userData.filter(usr => usr.id !== user.id)
    users.push(user)
    this.userData = users
    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (id: string): Promise<User | null > {
    const userFound = this.userData.find(usr => usr.id === id)

    if (userFound === undefined) return null

    return userFound
  }
}

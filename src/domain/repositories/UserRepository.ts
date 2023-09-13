// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User } from '../entities/User'

export interface UserRepository {
  // a continuacion solo se definen los contratos
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getUserByUserName: (username: string) => Promise<User | null>
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  getById: (id: string) => Promise<User | null>
}

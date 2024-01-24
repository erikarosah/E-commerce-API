import { User } from '../../entities/user'

export type newUser = {
    id: string;
    email: string;
    name: string;
    password: string;
    role: any | null;
    cart?: string[]
}

export interface UserRepository {
    create(user: User): Promise<newUser>
    findByEmail(email: string): Promise<newUser | null>
    findById(id: string): Promise<newUser | null>
}
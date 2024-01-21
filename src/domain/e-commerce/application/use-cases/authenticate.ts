import { compare } from 'bcrypt'
import { User } from '../../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UserRepository) { }

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error('Invalid Credentials Error')
        }

        const doesPasswordMatchs = await compare(password, user.password)

        if (!doesPasswordMatchs) {
            throw new Error('Invalid Credentials Error')
        }

        return {
            user
        }
    }
}
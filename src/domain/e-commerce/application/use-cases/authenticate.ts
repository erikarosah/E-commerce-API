import { compare } from 'bcrypt'
import { UserRepository, newUser } from '../repositories/user-repository'
import { Either, left, right } from '@/core/either'
import { InvalidCrendentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

type AuthenticateUseCaseResponse = Either<
    InvalidCrendentialsError,
    {
        user: newUser
    }
>

export class AuthenticateUseCase {
    constructor(private usersRepository: UserRepository) { }

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            return left(new InvalidCrendentialsError())
        }

        const doesPasswordMatchs = await compare(password, user.password)

        if (!doesPasswordMatchs) {
            return left(new InvalidCrendentialsError())
        }

        return right({
            user
        })
    }
}
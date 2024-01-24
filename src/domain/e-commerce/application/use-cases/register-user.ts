import { Either, left, right } from '@/core/either'
import { User } from '../../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcrypt'
import { NotAllowedError } from './errors/not-allowed-error'

interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    password: string,
    role: string,
}

type RegisterUserUseCaseResponse = Either<
    NotAllowedError,
    {
        user: User
    }
>

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        email,
        password,
        role,
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userAlreadyRegistered = await this.userRepository.findByEmail(email)

        if (userAlreadyRegistered) {
            return left(new NotAllowedError())
        }

        const password_hash = await hash(password, 6)

        const user = User.create({
            name,
            email,
            role,
            password: password_hash
        })

        await this.userRepository.create(user)

        return right({
            user
        })
    }
}
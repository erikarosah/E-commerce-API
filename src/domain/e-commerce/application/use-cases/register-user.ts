import { User } from '../../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUserUseCaseResponse {
    user: User
}

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({
        name,
        email,
        password
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userAlreadyRegistered = await this.userRepository.findByEmail(email)

        if (userAlreadyRegistered) {
            throw new Error('Not allowed')
        }

        const user = User.create({
            name,
            email,
            password
        })

        await this.userRepository.create(user)

        return {
            user
        }
    }
}
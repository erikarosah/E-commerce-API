import { RegisterUserUseCase } from '@/domain/e-commerce/application/use-cases/register-user'
import { PrismaUserRepository } from '@/infra/prisma/prisma-user-repository'


export function makeRegisterUserUseCase() {
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    return registerUseCase
}

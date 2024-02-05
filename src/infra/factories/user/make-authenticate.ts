import { AuthenticateUseCase } from '@/domain/e-commerce/application/use-cases/authenticate'
import { PrismaUserRepository } from '@/infra/prisma/prisma-user-repository'

export function makeAuthenticateUserUseCase() {
    const usersRepository = new PrismaUserRepository()
    const authenticate = new AuthenticateUseCase(usersRepository)

    return authenticate
}

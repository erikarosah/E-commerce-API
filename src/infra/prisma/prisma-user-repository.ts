import { prisma } from '@/app'
import { UserRepository } from '@/domain/e-commerce/application/repositories/user-repository'
import { User } from '@/domain/e-commerce/entities/user'

export class PrismaUserRepository implements UserRepository {
    async create(user: User) {
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            }
        })

        return newUser
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return user
        }

        return null
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) {
            return user
        }

        return null
    }
}
import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { usersRoutes } from './infra/http/controllers/user/route'
export const app = fastify()

export const prisma = new PrismaClient({
    log: ['error']
})

app.register(usersRoutes)
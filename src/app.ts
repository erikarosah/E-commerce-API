import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { usersRoutes } from './infra/http/controllers/user/routes'
import { productsRoutes } from './infra/http/controllers/product/routes'
import cors from '@fastify/cors'

export const app = fastify()

export const prisma = new PrismaClient({
    log: ['error']
})

app.register(cors, {
    origin: '*',
    methods: ['GET', 'DELETE', 'POST', 'PUT']
})

app.register(usersRoutes)
app.register(productsRoutes)
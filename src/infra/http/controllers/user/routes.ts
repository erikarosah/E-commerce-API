import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { payment } from './payment'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/users/session', authenticate)

    app.post('/create-checkout-session', payment)
}
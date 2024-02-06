import 'dotenv/config'
import { z } from 'zod'

const SECRET = process.env.SECRET
const STRIPE_API = process.env.STRIPE_API
const URL_FRONT = process.env.URL_FRONT

const envSchema = z.object({
    NODE_ENV: z.enum(
        ['dev', 'test', 'production']
    ).default('dev'),
    PORT: z.coerce.number().default(3333),
    SECRET: z.string().default(SECRET ? SECRET : ''),
    STRIPE_API: z.string().default(STRIPE_API ? STRIPE_API : ''),
    URL_FRONT: z.string().default(URL_FRONT ? URL_FRONT : '')
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid enviroment variables', _env.error.format())
    throw new Error('Invalid enviroment variables')
}

export const env = _env.data
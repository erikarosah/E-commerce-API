import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { User } from '../../entities/user'
import { hash } from 'bcrypt'

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authentication Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(inMemoryUserRepository)
    })

    it('should be able to authentication', async () => {
        const hashedPassword = await hash('123456', 6)

        await inMemoryUserRepository.create(
            User.create({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: hashedPassword.toString()
            })
        )

        const { user } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.password).toEqual(hashedPassword)
    })

    it('should not be able to authentication with wrong email', async () => {
        const newUser = User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        inMemoryUserRepository.create(newUser)

        await expect(() =>
            sut.execute({
                email: 'johndoe1@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to authentication with wrong password', async () => {
        const newUser = User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        inMemoryUserRepository.create(newUser)

        await expect(() =>
            sut.execute({
                email: newUser.email,
                password: '1234567'
            }),
        ).rejects.toBeInstanceOf(Error)
    })
})
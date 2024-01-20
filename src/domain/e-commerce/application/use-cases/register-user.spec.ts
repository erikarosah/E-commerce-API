import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterUserUseCase } from './register-user'
import { User } from '../../entities/user'

let inMemoryUserRepositoty: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepositoty = new InMemoryUserRepository
        sut = new RegisterUserUseCase(inMemoryUserRepositoty)
    })

    it('should be able to register a user', async () => {
        await sut.execute({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        expect(inMemoryUserRepositoty.items).toHaveLength(1)
        expect(inMemoryUserRepositoty.items[0]).toMatchObject({
            name: 'some name'
        })
    })

    it('should not be able to register a user once again', async () => {
        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepositoty.create(user)

        await expect(() =>
            sut.execute({
                name: 'another name',
                email: user.email,
                password: 'another password'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
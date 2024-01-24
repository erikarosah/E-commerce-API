import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterUserUseCase } from './register-user'
import { User } from '../../entities/user'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository
        sut = new RegisterUserUseCase(inMemoryUserRepository)
    })

    it('should be able to register a user', async () => {
        const result = await sut.execute({
            name: 'some name',
            email: 'some email',
            password: 'some password',
            role: 'USER'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items).toHaveLength(1)
        expect(inMemoryUserRepository.items[0]).toMatchObject({
            name: 'some name'
        })
    })

    it('should not be able to register a user once again', async () => {
        const user = User.create({
            name: 'some name',
            email: 'some email',
            password: 'some password'
        })

        inMemoryUserRepository.create(user)

        const result = await sut.execute({
            name: 'another name',
            email: user.email,
            password: 'another password',
            role: 'USER'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
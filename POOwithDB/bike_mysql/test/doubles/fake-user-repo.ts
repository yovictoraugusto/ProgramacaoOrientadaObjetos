import { UserRepo } from "../../src/ports/user-repo";
import { User } from "../../src/user";
import { DB } from "../../src/db";
import crypto from 'crypto'

export class FakeUserRepo implements UserRepo {
    users: User[] = []

    async find(db: DB, email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

    async add(db: DB, user: User): Promise<string> {
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    async remove(db: DB, email: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) this.users.splice(userIndex, 1)
    }

    async list(db: DB): Promise<User[]> {
        return this.users
    }

    async update(db: DB, email: string, user: User): Promise<void> {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) this.users[userIndex] = user
    }
}
import { User } from "../user";
import { DB } from "../db";

export interface UserRepo {
    find(db: DB, email: string): Promise<User>
    add(db: DB, user: User): Promise<string>
    remove(db: DB, email: string): Promise<void>
    list(db: DB): Promise<User[]>
    update(db: DB, email: string, user: User): Promise<void>
}

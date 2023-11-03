import { Bike } from "../bike"
import { DB } from "../db";

export interface BikeRepo {
    find(db: DB, id: string): Promise<Bike>
    add(db: DB, bike: Bike): Promise<string>
    remove(db: DB, id: string): Promise<void>
    update(db: DB, id: string, bike: Bike): Promise<void>
    list(db: DB): Promise<Bike[]>
}
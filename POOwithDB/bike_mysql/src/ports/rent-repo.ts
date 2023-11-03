import { Rent } from "../rent";
import { DB } from "../db";

export interface RentRepo {
    add(db: DB, rent: Rent): Promise<string>
    findOpen(db: DB, bikeId: string, userEmail: string): Promise<Rent>
    findOpenFor(db: DB, userEmail: string): Promise<Rent[]>
    update(db: DB, id: string, rent: Rent): Promise<void>
    updateEnd(db: DB, id: string, rent: Rent): Promise<void>
    list(db: DB): Promise<Rent[]>
    remove(db: DB, id: string): Promise<void>
}
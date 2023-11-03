import { RentRepo } from "../../src/ports/rent-repo";
import { Rent } from "../../src/rent";
import { DB } from "../../src/db";
import crypto from 'crypto'

export class FakeRentRepo implements RentRepo {
    rents: Rent[] = []

    async add(db: DB, rent: Rent): Promise<string> {
        const newId = crypto.randomUUID()
        rent.id = newId
        this.rents.push(rent)
        return newId
    }

    async findOpen(db: DB, bikeId: string, userEmail: string): Promise<Rent> {
        return this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            !rent.end
        )
    }

    async findOpenFor(db: DB, userEmail: string): Promise<Rent[]> {
        return this.rents.filter(rent =>
            rent.user.email === userEmail &&
            !rent.end)
    }

    async update(db: DB,id: string, rent: Rent): Promise<void> {
        const rentIndex = this.rents.findIndex(rent => rent.id === id)
        if (rentIndex !== -1) this.rents[rentIndex] = rent
    }

    async updateEnd(db: DB,id: string, rent: Rent): Promise<void> {
        const rentIndex = this.rents.findIndex(rent => rent.id === id)
        if (rentIndex !== -1) this.rents[rentIndex] = rent
    }

    async list(db: DB): Promise<Rent[]>{
        return this.rents
    }

    async remove(db: DB, id: string): Promise<void> {
        const rentIndex = this.rents.findIndex(rent => rent.id === id)
        if (rentIndex !== -1) this.rents.splice(rentIndex, 1)
    }
    
}
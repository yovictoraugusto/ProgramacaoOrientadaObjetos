import { Bike } from "../../src/bike";
import { BikeRepo } from "../../src/ports/bike-repo";
import { DB } from "../../src/db";
import crypto from 'crypto'

export class FakeBikeRepo implements BikeRepo {
    bikes: Bike[] = []

    async find(db: DB, id: string): Promise<Bike> {
        return this.bikes.find(bike => bike.id === id)
    }

    async add(db: DB, bike: Bike): Promise<string> {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    async remove(db: DB, id: string): Promise<void> {
        const bikeIndex = this.bikes.findIndex(bike => 
            bike.id === id)
        if (bikeIndex !== -1) this.bikes.splice(bikeIndex, 1)
    }

    async list(db: DB): Promise<Bike[]> {
        return this.bikes
    }

    async update(db: DB, id: string, bike: Bike): Promise<void> {
        const bikeIndex = this.bikes.findIndex(bike => bike.id === id)
        if (bikeIndex !== -1) this.bikes[bikeIndex] = bike
    }
}
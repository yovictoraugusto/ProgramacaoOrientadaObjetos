import { Bike } from "../bike"

export interface BikeRepo{
    find(email: string): Promise<Bike>
    add(bike: Bike): Promise<string>
    remove(id: string): Promise<void>
    update(id: string, bike: Bike): Promise<void>
    list(): Promise<Bike[]>
}
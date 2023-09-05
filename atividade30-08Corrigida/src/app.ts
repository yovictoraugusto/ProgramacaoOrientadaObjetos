import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App{
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    findBike(id: string): Bike{
        return this.bikes.find(bike => bike.id === id)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    //register bike
    // registerBike(bike: Bike): string{
    //     bike.id = crypto.randomUUID()
    //     this.bikes.push(bike)
    //     return bike.id
    // }

    registerBike(bike: Bike): string{
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    //removeUser
    // removeUser(user: User): void{
    //     this.users.slice(this.users.indexOf(user))
    // }

    removeUser(email: string):void{
        const userIndex = this.users.findIndex(user => user.email === email)
        if(userIndex !== -1){
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User not found.')
    }

    //rent bike
    // rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date){
    //     const bike = this.findBike(bikeId)
    //     const user = this.findUser(userEmail)
    //     //Arrray somente com as reservas para bike
    //     const result = this.rents.filter(rent => rent.bike === bike)
    //     //tentar criar o rent com o array e as informações da reserva
    //     const newRent = Rent.create(result, bike, user, startDate, endDate)
    //     //adicionar a reserva ao array de reservas
    //     this.rents.push(newRent)
    // }

    rentBike(bikeId: string, userEmail:string, startDate:Date, endDate:Date):void{
        const bike = this.bikes.find(bike => bike.id === bikeId)
        const user = this.findUser(userEmail)
        if(!bike){
            throw new Error('Bike not found.')
        }
        if(!user){
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent => rent.bike.id === bikeId && !rent.dateReturn)
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    //return bike
    // returnBike(rent: Rent): void{
    //     const today = new Date()
    //     for(const rRent of this.rents){
    //         if(rRent === rent){
    //             rent.dateReturn = today
    //         }
    //     }
    // }

    returnBike(bikeId, userEmail){
        const today = new Date()
        const rent = this.rents.find(rent => rent.bike.id === bikeId && 
            rent.user.email === userEmail && 
            rent.dateReturn === undefined &&
            rent.dateFrom <= today)
        if(rent){
            rent.dateReturn  = today
            return
        }
        throw new Error('Rent not found.')
    }
}
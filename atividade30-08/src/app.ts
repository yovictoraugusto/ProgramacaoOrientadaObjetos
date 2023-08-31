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
        user.id = crypto.randomUUID()
        this.users.push(user)
        return user.id
    }

    //removeUser
    removeUser(user: User): void{
        this.users.slice(this.users.indexOf(user))
    }

    //register bike
    registerBike(bike: Bike): string{
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
        return bike.id
    }

    //rent bike
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date){
        const bike = this.findBike(bikeId)
        const user = this.findUser(userEmail)
        //Arrray somente com as reservas para bike
        const result = this.rents.filter(rent => rent.bike === bike)
        //tentar criar o rent com o array e as informações da reserva
        const newRent = Rent.create(result, bike, user, startDate, endDate)
        //adicionar a reserva ao array de reservas
        this.rents.push(newRent)
    }

    //return bike
    returnBike(rent: Rent): void{
        const today = new Date()
        for(const rRent of this.rents){
            if(rRent === rent){
                rent.dateReturn = today
            }
        }
    }
}
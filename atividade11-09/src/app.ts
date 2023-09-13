import { Bike } from "./bike";
import { Crypt } from "./crypt";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
const bcrypt = require('bcrypt')

  export class App{
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    findBike(id: string): Bike{
        return this.bikes.find(bike => bike.id === id)
    }

    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        const encryptPassword = await this.crypt.encrypt(user.password)
        user.password = encryptPassword
        this.users.push(user)
        return newId
    }


    registerBike(bike: Bike): string{
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string):void{
        const userIndex = this.users.findIndex(user => user.email === email)
        if(userIndex !== -1){
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User not found.')
    }

    rentBike(bikeId: string, userEmail:string):void{
      const bike = this.bikes.find(bike => bike.id === bikeId)
      const user = this.findUser(userEmail)
      if(!bike){
          throw new Error('Bike not found.')
      }
      if(!user){
          throw new Error('User not found.')
      }
      if(!bike.available){
        throw new Error("Bike not available")
      }
      bike.available = false
      const newRent = new Rent (bike, user, new Date())
      this.rents.push(newRent)
    }

    returnBike(bikeId, userEmail):Number{
      const now = new Date()
      const rent = this.rents.find(rent => rent.bike.id === bikeId &&
        rent.user.email === userEmail &&
        !rent.end)
      if(!rent)throw new Error('Rent not found.')
      rent.bike.available = true
      rent.end = now
      const hour = diff_hours(rent.start,rent.end)
      return rent.bike.rate * hour
    }

    listUsers(): User[]{
      return this.users
    }

    listRent(): Rent[]{
      return this.rents
    }
  
    listBikes(): Bike[]{
      return this.bikes
    }

    async authenticate(userEmail: string, password:string): Promise<boolean>{
      const user = this.findUser(userEmail)
      if(!user) throw new Error('User not found')
      return await this.crypt.compare(password, user.password)
    }

}

function diff_hours(dt2: Date, dt1: Date){
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
  
 }
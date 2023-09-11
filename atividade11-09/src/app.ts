import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
const bcrypt = require('bcrypt')

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

        //password encryption
        bcrypt.hash(user.password, 10, hash) => {
          if(err){
            console.error('Erro ao criar o hash:',err)
            return
          }
          user.password = hash
        }
      
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

  //listagem de usuários
  userList(user: User): void{
    console.log("Listagem de Usuários:")
    for(const rUser of this.users){
      console.log("NOME: " + rUser.name)
      console.log("EMAIL: "+ rUser.email)
      console.log("=======================================")
    }
  }

  //listagem de reservas/aluguéis
  rentList(rent: Rent): void{
    console.log("Listagem dos Alugueis:")
    for(const rRent of this.rents){
      console.log("BIKE: "+ rRent.bike.id)
      console.log("USUÁRIO: "+ rRent.user.email)
      console.log("DATA DE INICÍO: "+ rRent.dateFrom)
      console.log("DATA DE FIM: " +rRent.dateTo)
      console.log("=======================================")
    }
  }
  
  //listagem de bikes
  bikeList(bike: Bike):void{
    console.log("Listatem das bicicletas:")
    for(const rBike of this.bikes){
      console.log("NOME: "+rBike.name)
      console.log("ID: "+rBike.id)
      console.log("TIPO: "+rBike.type)
      console.log("PREÇO: "+rBike.ratings)
    }
  }

  //authentic user
  authenticUser(rUser: User, userId: string, userPassword: string):void{
    if(rUser.email === userId){
      bcrypt.compare(rUser.password, userPassword, )err,result)=>{
        if(err){
          console.error("Erro ao comparar as senhas:",err)
          return
        }
        if(result){
          console.log("Login realizado!")
        }else{
          console.log("A senha está incorreta.")
        }
      })
    }else{
      console.log('Login errado')
    }
    
  }
  
}
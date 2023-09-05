import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App()
const bike = new Bike('Mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [])
const bikeId = app.registerBike(bike)
//console.log(app.bikes)
const user = new User('Maria', 'maria@email.com', '1234')
const user1 = new User('Joao', 'joao@email.com', '1234')
app.registerUser(user)
app.registerUser(user1)
console.log(app.users)
app.removeUser(user.email)
console.log(app.users)

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate()+1)
const dayAfterTomorrow = new Date()
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
const threeDaysFromToday = new Date()
threeDaysFromToday.setDate(threeDaysFromToday.getDate() + 3)
const yesterday = new Date()
yesterday.setDate(yesterday.getDate()-1)

try{
    app.rentBike(bikeId, user.email,today,tomorrow)
    app.rentBike(bikeId, user1.email,dayAfterTomorrow, threeDaysFromToday)
}catch (e){
    console.log('An error ocured:', e.message)
}

console.log(app.rents)

// const twoDaysFromToday = new Date()
// const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)

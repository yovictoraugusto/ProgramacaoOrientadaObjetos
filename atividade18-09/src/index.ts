import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'

async function main(){
    const app = new App()
    const user1 = new User('Jose', 'jose@email.com', '1234')
    await app.registerUser(user1)
    console.log(user1.password)
    const bike = new Bike('caloi mountainbike','Mountain Bike',0,0,234, 1234, 100.0)
    const clock = sinon.useFakeTimers();
    app.registerBike(bike)
    //console.log('Bike disponível: ', bike.available)
    app.rentBike(bike.id, user1.email)
    //console.log('Bike disponível: ', bike.available)
    clock.tick(1000 * 60 * 65)
    //console.log(app.returnBike(bike.id, user1.email))
    //console.log('Bike disponível: ', bike.available)
    const test = await app.authenticate(user1.email, '1234')
    console.log(test)
}

main()
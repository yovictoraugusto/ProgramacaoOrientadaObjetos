import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

async function main(){
    const app = new App()
    const user1 = new User('Jose', 'jose@email.com', '1234')
    const bike = new Bike('Caloi', 'Montanha', 5, 2,100, '',0,)
}

main()
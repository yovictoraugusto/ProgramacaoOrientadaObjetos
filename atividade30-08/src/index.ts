import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('Mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@email.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)

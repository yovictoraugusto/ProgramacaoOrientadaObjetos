"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const app = new app_1.App();
const bike = new bike_1.Bike('Mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, []);
const bikeId = app.registerBike(bike);
//console.log(app.bikes)
const user = new user_1.User('Maria', 'maria@email.com', '1234');
const user1 = new user_1.User('Joao', 'maria@email.com', '1234');
app.registerUser(user);
app.registerUser(user1);
console.log(app.users);
app.removeUser(user.email);
console.log(app.users);
// const today = new Date()
// const twoDaysFromToday = new Date()
// const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)

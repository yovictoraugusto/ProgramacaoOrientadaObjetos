"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const crypt_1 = require("./crypt");
const rent_1 = require("./rent");
const bike_not_found_error_1 = require("./errors/bike-not-found-error");
const unavailable_bike_error_1 = require("./errors/unavailable-bike-error");
const user_not_found_error_1 = require("./errors/user-not-found-error");
const duplicate_user_error_1 = require("./errors/duplicate-user-error");
const user_has_open_rent_error_1 = require("./errors/user-has-open-rent-error");
class App {
    constructor(userRepo, bikeRepo, rentRepo, db) {
        this.userRepo = userRepo;
        this.bikeRepo = bikeRepo;
        this.rentRepo = rentRepo;
        this.db = db;
        this.crypt = new crypt_1.Crypt();
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.find(this.db, email);
            if (!user)
                throw new user_not_found_error_1.UserNotFoundError();
            return user;
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userRepo.find(this.db, user.email)) {
                throw new duplicate_user_error_1.DuplicateUserError();
            }
            const encryptedPassword = yield this.crypt.encrypt(user.password);
            user.password = encryptedPassword;
            return yield this.userRepo.add(this.db, user);
        });
    }
    authenticate(userEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(userEmail);
            return yield this.crypt.compare(password, user.password);
        });
    }
    registerBike(bike) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bikeRepo.add(this.db, bike);
        });
    }
    removeUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findUser(email);
            if ((yield this.rentRepo.findOpenFor(email)).length > 0) {
                throw new user_has_open_rent_error_1.UserHasOpenRentError();
            }
            yield this.userRepo.remove(this.db, email);
        });
    }
    rentBike(bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this.findBike(bikeId);
            if (!bike.available) {
                throw new unavailable_bike_error_1.UnavailableBikeError();
            }
            const user = yield this.findUser(userEmail);
            bike.available = false;
            yield this.bikeRepo.update(this.db, bikeId, bike);
            const newRent = new rent_1.Rent(bike, user, new Date());
            return yield this.rentRepo.add(newRent);
        });
    }
    returnBike(bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const rent = yield this.rentRepo.findOpen(bikeId, userEmail);
            if (!rent)
                throw new Error('Rent not found.');
            rent.end = now;
            yield this.rentRepo.update(rent.id, rent);
            rent.bike.available = true;
            yield this.bikeRepo.update(this.db, rent.bike.id, rent.bike);
            const hours = diffHours(rent.end, rent.start);
            return hours * rent.bike.rate;
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.list(this.db);
        });
    }
    listBikes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bikeRepo.list(this.db);
        });
    }
    moveBikeTo(bikeId, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this.findBike(bikeId);
            bike.location.latitude = location.latitude;
            bike.location.longitude = location.longitude;
            yield this.bikeRepo.update(this.db, bikeId, bike);
        });
    }
    findBike(bikeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield this.bikeRepo.find(this.db, bikeId);
            if (!bike)
                throw new bike_not_found_error_1.BikeNotFoundError();
            return bike;
        });
    }
}
exports.App = App;
function diffHours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}

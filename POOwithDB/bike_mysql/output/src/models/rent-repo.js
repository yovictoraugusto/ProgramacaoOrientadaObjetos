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
exports.DBRentRepo = void 0;
const rent_1 = require("../../src/rent");
class DBRentRepo {
    constructor() {
        this.rents = [];
    }
    add(db, rent) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`INSERT INTO rents (bike_id, user_id, start) VALUES (?,?,?)`, [rent.bike, rent.user, rent.start], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results.insertId.toString());
                    }
                });
            });
            // const newId = crypto.randomUUID()
            // rent.id = newId
            // this.rents.push(rent)
            // return newId
        });
    }
    findOpen(db, bikeId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let rent;
                db.connection.query('SELECT id, bike_id, user_id, start, end FROM rents WHERE end IS NULL LIMIT 1', [bikeId, userEmail], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (results.length > 0) {
                            const value = results[0];
                            rent = new rent_1.Rent(value['id'], value['bike_id'], value['user_id'], value['start'], value['end']);
                        }
                        resolve(rent);
                    }
                });
            });
            // return this.rents.find(rent =>
            //     rent.bike.id === bikeId &&
            //     rent.user.email === userEmail &&
            //     !rent.end
            // )
        });
    }
    findOpenFor(db, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const rents = [];
                db.connection.query('Select distinct rents.id,bike_id,user_id,start,end from rents join users ON rents.user_id = users.id where end is null and users.email = ? order by rents.id', (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        results.forEach((value) => {
                            const rent = new rent_1.Rent(value['id'], value['bike_id'], value['user_id'], value['start'], value['end']);
                            rents.push(rent);
                        });
                        resolve(rents);
                    }
                });
            });
            // return this.rents.filter(rent =>
            //     rent.user.email === userEmail &&
            //     !rent.end)
        });
    }
    update(db, id, rent) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`UPDATE rents SET bike_id = ?, user_id = ?, start = ?, end = ? WHERE id = ?`, [rent.bike, rent.user, rent.start, rent.end, id], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results.affectedRows.toString());
                    }
                });
            });
        });
    }
    updateEnd(db, id, rent) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`UPDATE rents SET end = ? WHERE id = ?`, [rent.end, id], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results.affectedRows.toString());
                    }
                });
            });
        });
    }
    list(db) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const rents = [];
                db.connection.query('select id,bike_id,user_id,start,end from rents order by id asc', (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        results.forEach((value) => {
                            const rent = new rent_1.Rent(value['id'], value['bike_id'], value['user_id'], value['start'], value['end']);
                            rents.push(rent);
                        });
                        resolve(rents);
                    }
                });
            });
        });
    }
    remove(db, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`DELETE FROM rents where id = ?`, [id], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results.affectedRows.toString());
                    }
                });
            });
        });
    }
}
exports.DBRentRepo = DBRentRepo;

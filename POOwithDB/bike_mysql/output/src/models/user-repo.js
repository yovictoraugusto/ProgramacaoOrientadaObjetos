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
exports.DBUserRepo = void 0;
const user_1 = require("../user");
class DBUserRepo {
    find(db, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let user;
                db.connection.query('SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1', [email], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (results.length > 0) {
                            const value = results[0];
                            user = new user_1.User(value['name'], value['email'], value['password'], value['id']);
                        }
                        resolve(user);
                    }
                });
            });
        });
    }
    add(db, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [user.name, user.email, user.password], (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results.insertId.toString());
                    }
                });
            });
        });
    }
    remove(db, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`DELETE FROM users where email = ?`, [email], (error, results, fields) => {
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
                const users = [];
                db.connection.query('select id,name,email,password from users order by id asc', (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        results.forEach((value) => {
                            const user = new user_1.User(value['name'], value['email'], value['password'], value['id']);
                            users.push(user);
                        });
                        resolve(users);
                    }
                });
            });
        });
    }
    update(db, email, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.connection.query(`UPDATE users SET name = ?, email = ?, password = ? WHERE email = ?`, [user.name, user.email, user.password, email], (error, results, fields) => {
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
exports.DBUserRepo = DBUserRepo;

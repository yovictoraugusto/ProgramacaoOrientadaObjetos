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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUserRepo = void 0;
var user_1 = require("../user");
var DBUserRepo = /** @class */ (function () {
    function DBUserRepo() {
    }
    DBUserRepo.prototype.find = function (db, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var user;
                        db.connection.query('SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1', [email], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (results.length > 0) {
                                    var value = results[0];
                                    user = new user_1.User(value['name'], value['email'], value['password'], value['id']);
                                }
                                resolve(user);
                            }
                        });
                    })];
            });
        });
    };
    DBUserRepo.prototype.add = function (db, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [user.name, user.email, user.password], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(results.insertId.toString());
                            }
                        });
                    })];
            });
        });
    };
    DBUserRepo.prototype.remove = function (db, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("DELETE FROM users where email = ?", [email], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(results.affectedRows.toString());
                            }
                        });
                    })];
            });
        });
    };
    DBUserRepo.prototype.list = function (db) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var users = [];
                        db.connection.query('select id,name,email,password from users order by id asc', function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                results.forEach(function (value) {
                                    var user = new user_1.User(value['name'], value['email'], value['password'], value['id']);
                                    users.push(user);
                                });
                                resolve(users);
                            }
                        });
                    })];
            });
        });
    };
    DBUserRepo.prototype.update = function (db, email, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        db.connection.query("UPDATE users SET name = ?, email = ?, password = ? WHERE email = ?", [user.name, user.email, user.password, email], function (error, results, fields) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(results.affectedRows.toString());
                            }
                        });
                    })];
            });
        });
    };
    return DBUserRepo;
}());
exports.DBUserRepo = DBUserRepo;

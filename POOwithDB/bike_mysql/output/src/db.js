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
exports.DB = void 0;
class DB {
    constructor() {
        this.mysql = require('mysql');
        this.connection_status = 0;
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bike_poo'
        });
        this.open();
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection.end();
            this.connection_status = 0;
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection.connect();
            this.connection_status = 1;
        });
    }
    query_test() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection_status == 0) {
                this.open();
            }
            this.connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
                if (error)
                    throw error;
                console.log('The solution is: ', results[0].solution);
            });
        });
    }
    query3(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection_status == 0) {
                this.open();
            }
            this.connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
                if (error)
                    throw error;
                console.log('The solution is: ', results[0].solution);
            });
        });
    }
}
exports.DB = DB;

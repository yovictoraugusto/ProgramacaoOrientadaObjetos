"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
class Conta {
    constructor(numero, dono) {
        this._saldo = 0.0;
        this.numero = numero;
        this.dono = dono;
    }
    get saldo() {
        return this._saldo;
    }
    set saldo(quantia) {
    }
    credita(quantia) {
        this._saldo += quantia;
    }
    debita(quantia) {
        this._saldo -= quantia;
    }
}
exports.Conta = Conta;

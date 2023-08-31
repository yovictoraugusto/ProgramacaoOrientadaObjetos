"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(idClinte, nome, cpf, endereco) {
        this._idCliente = idClinte;
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
    }
}
exports.Cliente = Cliente;

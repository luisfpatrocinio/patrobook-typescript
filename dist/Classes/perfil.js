"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
class Perfil {
    constructor(_id, _nome, _email) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
    }
    // Métodos Get:
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
}
exports.Perfil = Perfil;

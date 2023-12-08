"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
const profileExceptions_1 = require("../profileExceptions");
class RepositorioDePerfis {
    constructor() {
        this._perfis = new Array;
    }
    // Cadastra um perfil no array:
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    consultar(id, nome, email) {
        // Pesquisando por ID: 
        if (id !== undefined) {
            const perfilPorId = this._perfis.find((p) => p.id === id);
            if (perfilPorId)
                return perfilPorId;
        }
        // Pesquisando por Nome: 
        if (nome != undefined) {
            const perfilPorNome = this._perfis.find((p) => p.nome.toLowerCase() === nome.toLowerCase());
            if (perfilPorNome)
                return perfilPorNome;
        }
        // Pesquisando por Email
        if (email != undefined) {
            const perfilPorEmail = this._perfis.find((p) => p.email.toLowerCase() === email.toLowerCase());
            if (perfilPorEmail)
                return perfilPorEmail;
        }
        throw new profileExceptions_1.ProfileNotFoundError("Perfil não encontrado.");
    }
    get perfis() {
        return this._perfis;
    }
    set perfis(novosPerfis) {
        this._perfis = novosPerfis;
    }
}
exports.RepositorioDePerfis = RepositorioDePerfis;

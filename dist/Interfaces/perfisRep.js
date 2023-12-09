"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
const profileExceptions_1 = require("../Exceptions/profileExceptions");
class RepositorioDePerfis {
    constructor() {
        this._perfis = new Array;
    }
    // Cadastra um perfil no array:
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    /**
     * Retorna um perfil do repositório de perfis a partir do ID, Nome ou Email.
     *
     * @param id - O ID do perfil a ser consultado (opcional).
     * @param nome - O nome do perfil a ser consultado (opcional).
     * @param email - O email do perfil a ser consultado (opcional).
     * @returns O perfil encontrado.
     * @throws ProfileNotFoundError - Caso o perfil não seja encontrado.
     */
    consultar(id, nome, email) {
        // Pesquisando por ID: 
        if (id !== undefined) {
            const perfilPorId = this._perfis.find((p) => p.id === id);
            if (perfilPorId)
                return perfilPorId;
            throw new profileExceptions_1.ProfileNotFoundError("ID NAO ENCONTRADO");
        }
        // Pesquisando por Nome: 
        if (nome != undefined) {
            const perfilPorNome = this._perfis.find((p) => p.nome.toLowerCase() === nome.toLowerCase());
            if (perfilPorNome)
                return perfilPorNome;
            throw new profileExceptions_1.ProfileNotFoundError("NOME NAO ENCONTRADO");
        }
        // Pesquisando por Email
        if (email != undefined) {
            const perfilPorEmail = this._perfis.find((p) => p.email.toLowerCase() === email.toLowerCase());
            if (perfilPorEmail)
                return perfilPorEmail;
            throw new profileExceptions_1.ProfileNotFoundError("EMAIL NAO ENCONTRADO");
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
const fs_1 = require("fs");
const perfil_1 = require("../Classes/perfil");
const profileExceptions_1 = require("../Exceptions/profileExceptions");
class RepositorioDePerfis {
    constructor() {
        this._perfis = new Array;
        // Carregar perfis do banco de dados.
        this.carregarPerfis();
    }
    salvarPerfis() {
        let saveString = "";
        for (let i = 0; i < this._perfis.length; i++) {
            var _perfil = this._perfis[i];
            saveString += `${_perfil.id}|${_perfil.nome}|${_perfil.email}\n`;
        }
        const file = (0, fs_1.writeFileSync)("savePerfis.txt", saveString);
    }
    carregarPerfis() {
        // Ler Arquivos
        let perfis = new Array;
        let perfisString = new Array;
        try {
            // Ler arquivo de perfis "savePerfis.txt"
            let _conteudo = (0, fs_1.readFileSync)("savePerfis.txt", "utf-8").split("\n");
            for (let i = 0; i < _conteudo.length; i++) {
                if (_conteudo[i] != "") {
                    perfisString.push(_conteudo[i]);
                }
            }
            // Para cada linha do arquivo
            for (let i = 0; i < perfisString.length; i++) {
                if (perfisString[i] != "") {
                    // Separar o id e o nome
                    let _perfil = perfisString[i].split("|");
                    // Criar um registro com id e nome
                    let _cadastroPerfil = new perfil_1.Perfil(Number(_perfil[0]), _perfil[1], _perfil[2]);
                    // Adicionar o objeto no vetor de perfis
                    perfis[i] = _cadastroPerfil;
                }
            }
            // Atribuir o vetor de perfis ao atributo perfis
            this._perfis = perfis;
        }
        catch (err) {
            //@TODO: Remover console.log
            console.log(err);
        }
    }
    incluir(perfil) {
        this._perfis.push(perfil);
    }
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
    salvar() {
        let saveString = "";
        for (let i = 0; i < this._perfis.length; i++) {
            var _perfil = this._perfis[i];
            if (_perfil != null) {
                saveString += `${_perfil.id}|${_perfil.nome}|${_perfil.email}\n`;
            }
        }
        const file = (0, fs_1.writeFileSync)("savePerfis.txt", saveString);
    }
}
exports.RepositorioDePerfis = RepositorioDePerfis;

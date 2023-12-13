import { readFileSync, writeFileSync } from "fs";
import { Perfil } from "../Classes/perfil";
import { ProfileNotFoundError } from "../Exceptions/profileExceptions";
import { IRepPerfis } from "../Interfaces/IRepPerfis";

export class RepositorioDePerfis implements IRepPerfis {
    private _perfis: Array<Perfil> = new Array<Perfil>;
    
    constructor() {
        // Carregar perfis do banco de dados.
        this.carregarPerfis();
    }

    salvarPerfis(): void {
        let saveString = "";
        for (let i = 0; i < this._perfis.length; i++) {
            var _perfil: Perfil = this._perfis[i];
            saveString += `${_perfil.id}|${_perfil.nome}|${_perfil.email}\n`;
        }
        const file = writeFileSync("savePerfis.txt", saveString)
    }

    carregarPerfis(): void {
        // Ler Arquivos
        let perfis = new Array<Perfil>;
        let perfisString = new Array<String>;
        try {
            // Ler arquivo de perfis "savePerfis.txt"
            let _conteudo = readFileSync("savePerfis.txt", "utf-8").split("\n");

            for (let i = 0; i < _conteudo.length; i++) {
                if (_conteudo[i] != "") {
                    perfisString.push(_conteudo[i]);
                }
            }

            // Para cada linha do arquivo
            for (let i = 0; i < perfisString.length; i++) {
                if (perfisString[i] != "") {
                    // Separar o id e o nome
                    let _perfil: Array<string> = perfisString[i].split("|");
                    // Criar um registro com id e nome
                    let _cadastroPerfil = new Perfil(Number(_perfil[0]), _perfil[1], _perfil[2])
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

    incluir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }
    
    consultar(id?: number, nome?: string, email?: string): Perfil {
        // Pesquisando por ID: 
        if (id !== undefined) {
            const perfilPorId = this._perfis.find((p) => p.id === id);
            if (perfilPorId) return perfilPorId;
            throw new ProfileNotFoundError("ID NAO ENCONTRADO");
        }

        // Pesquisando por Nome: 
        if (nome != undefined) {
            const perfilPorNome = this._perfis.find((p) => p.nome.toLowerCase() === nome.toLowerCase());
            if (perfilPorNome) return perfilPorNome;
            throw new ProfileNotFoundError("NOME NAO ENCONTRADO");
        }

        // Pesquisando por Email
        if (email != undefined) {
            const perfilPorEmail = this._perfis.find((p) => p.email.toLowerCase() === email.toLowerCase());
            if (perfilPorEmail) return perfilPorEmail;
            throw new ProfileNotFoundError("EMAIL NAO ENCONTRADO");
        }
        
        throw new ProfileNotFoundError("Perfil não encontrado.");
    }  

    get perfis(): Array<Perfil> {
        return this._perfis;
    }

    set perfis(novosPerfis: Array<Perfil>) {
        this._perfis = novosPerfis;
    }

    salvar(): void {
        let saveString = "";
        for (let i = 0; i < this._perfis.length; i++) {
            var _perfil: Perfil | null = this._perfis[i];
            if (_perfil != null) {
                saveString += `${_perfil.id}|${_perfil.nome}|${_perfil.email}\n`;
            }
        }
        const file = writeFileSync("savePerfis.txt", saveString)
    }
}
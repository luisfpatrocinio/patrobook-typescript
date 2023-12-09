import { Perfil } from "../Classes/perfil";
import { ProfileNotFoundError } from "../Exceptions/profileExceptions";
import { IRepPerfis } from "../Interfaces/IRepPerfis";

export class RepositorioDePerfis implements IRepPerfis {
    private _perfis: Array<Perfil> = new Array<Perfil>;
    
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
}
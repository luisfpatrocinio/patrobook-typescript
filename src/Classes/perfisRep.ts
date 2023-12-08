
import { ProfileNotFoundError } from "../Exceptions/profileExceptions";
import { Perfil } from "./perfil";

export class RepositorioDePerfis {
    private _perfis: Array<Perfil> = new Array<Perfil>;
    
    // Cadastra um perfil no array:
    incluir(perfil: Perfil): void {
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
import { Perfil } from "../Classes/perfil";

export interface IRepPerfis {

    perfis: Array<Perfil>;

    /**
     * Incluir um perfil no repositório.
     * @param perfil Perfil a ser incluído.
     */
    incluir(perfil: Perfil): void;

    /**
     * Retorna um perfil do repositório de perfis a partir do ID, Nome ou Email.
     * 
     * @param id - O ID do perfil a ser consultado (opcional).
     * @param nome - O nome do perfil a ser consultado (opcional).
     * @param email - O email do perfil a ser consultado (opcional).
     * @returns O perfil encontrado.
     * @throws ProfileNotFoundError - Caso o perfil não seja encontrado.
     */
    consultar(id?: number, nome?: string, email?: string): Perfil;
}


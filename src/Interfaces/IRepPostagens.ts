import { Postagem, PostagemAvancada } from "../Classes/postagem";
import { Perfil } from "../Classes/perfil";
import { PostNotFoundError } from "../Exceptions/postExceptions";

export interface IRepPostagens {
    postagens: Array<Postagem>;

    /**
     * Inclui uma postagem no repositório de postagens.
     * @param postagem Postagem a ser incluída.
     */
    incluir(postagem: Postagem): void;

    /**
     * Consulta as postagens com base nos filtros especificados.
     * Exibe todas as postagens caso não haja argumentos, ou não tenha sido inserido argumentos.
     * @param id - O ID da postagem a ser consultada.
     * @param texto - O texto a ser pesquisado nas postagens.
     * @param hashtag - A hashtag a ser pesquisada nas postagens.
     * @param perfil - O perfil associado às postagens.
     * @returns Um array de postagens que atendem aos filtros especificados.
     * @throws {PostNotFoundError} - Se nenhuma postagem for encontrada com os filtros especificados.
     */
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Array<Postagem>;
}
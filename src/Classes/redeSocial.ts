import { Perfil } from "./perfil";
import { Postagem, PostagemAvancada } from "./postagem";
import { RepositorioDePerfis } from "../Repositories/perfilRep";
import { RepositorioDePostagens } from "../Repositories/postsRep";
import { IRepPerfis } from "../Interfaces/IRepPerfis";
import { IRepPostagens } from "../Interfaces/IRepPostagens";

export class RedeSocial {
    private _repPerfis: IRepPerfis;
    private _repPostagens: IRepPostagens;

    constructor (repPerfis: IRepPerfis, repPostagens: IRepPostagens) {
        this._repPerfis = repPerfis;
        this._repPostagens = repPostagens;
    }

    incluirPerfil(perfil: Perfil): void {
        try {
            this._repPerfis.consultar(perfil.id, perfil.nome, perfil.email);
        } catch (_e) {
            this._repPerfis.incluir(perfil);
        }
    }

    /**
     * Consulta o perfil com base nos parâmetros fornecidos.
     * 
     * @param id - O ID do perfil a ser consultado (opcional).
     * @param nome - O nome do perfil a ser consultado (opcional).
     * @param email - O email do perfil a ser consultado (opcional).
     * @returns O perfil encontrado com base nos parâmetros fornecidos.
     * @throws ProfileNotFoundError - Caso o perfil não seja encontrado.
     */
    consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
        return this._repPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {
        this._repPostagens.incluir(postagem);
    }

    // Retorna todas as postagens caso não haja argumentos
    consultarPostagens(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Array<Postagem> {
        return this._repPostagens.consultar(id, texto, hashtag, perfil);
    }

    curtir(idPostagem: number): void {
        var _postagens: Array<Postagem> = this._repPostagens.consultar(idPostagem);
        if (_postagens.length > 0) _postagens[0].curtir();
    }

    descurtir(idPostagem: number): void {
        var _postagens: Array<Postagem> = this._repPostagens.consultar(idPostagem);
        if (_postagens.length > 0) _postagens[0].descurtir();
    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void {
        if (postagem.visualizacoesRestantes > 0) {
            postagem.decrementarVisualizacoes();
        }
    }

    exibirPostagensPorPerfil(idPerfil: number): Array<Postagem> {
        // Encontrar perfil a partir do ID
        const _perfil = this._repPerfis.consultar(idPerfil);
        if (_perfil === null) return new Array<Postagem>;
        
        // Encontrar postagens a partir do perfil
        const _postagens = this._repPostagens.consultar(undefined, undefined, undefined, _perfil);
        const _postagensFiltradas = new Array<Postagem>;
        
        // Em cada postagem:
        for (let i = 0; i < _postagens.length; i++) {
            var _post = _postagens[i];

            // Essa postagem deverá ser incluída no array.
            var _canPush = true;

            // Se for uma postagem avançada:
            if (_post instanceof PostagemAvancada) {
                // Checar se há visualizações restantes:
                if (_post.visualizacoesRestantes <= 0) _canPush = false;

                // Decrementar visualizações
                this.decrementarVisualizacoes(_post);
            }

            if (_canPush) _postagensFiltradas.push(_post);
        }
        
        return _postagensFiltradas;
    }

    exibirPostagensPorHashtag(hashtag: string): Array<PostagemAvancada> {
        // Obter todas as postagens que possuem essa hashtag
        const _postagens = this._repPostagens.consultar(undefined, undefined, hashtag, undefined);

        // Array vazio que será alimentado e retornado
        const _postagensFiltradas = new Array<PostagemAvancada>;
        
        // Em cada postagem:
        for (let i = 0; i < _postagens.length; i++) {
            var _post = _postagens[i];
            if (_post instanceof PostagemAvancada) {
                // Checar se há visualizações restantes:
                var _canPush = (_post.visualizacoesRestantes > 0);

                // Decrementar visualizações
                this.decrementarVisualizacoes(_post);
                
                // Adicionar ao array.
                if (_canPush) _postagensFiltradas.push(_post);
            }
        }

        return _postagensFiltradas;
    }

    /**
     * Obtém os perfis da rede social.
     * @returns Um array de objetos do tipo Perfil.
     */
    obterPerfis(): Array<Perfil> {
        return this._repPerfis.perfis;
    }

    obterPostagens(): Array<Postagem> {
        // Retorna todas as postagens.
        return this._repPostagens.consultar();
    }

    atribuirPerfisCarregados(novosPerfis: Array<Perfil>): void {
        this._repPerfis.perfis = novosPerfis;
    }

    atribuirPostagensCarregadas(novasPostagens: Array<Postagem | PostagemAvancada>): void {
        this._repPostagens.postagens = novasPostagens;
    }
}
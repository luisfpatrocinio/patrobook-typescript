"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const postagem_1 = require("./postagem");
class RedeSocial {
    constructor(repPerfis, repPostagens) {
        this._repPerfis = repPerfis;
        this._repPostagens = repPostagens;
    }
    incluirPerfil(perfil) {
        try {
            this._repPerfis.consultar(perfil.id, perfil.nome, perfil.email);
        }
        catch (_e) {
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
    consultarPerfil(id, nome, email) {
        return this._repPerfis.consultar(id, nome, email);
    }
    incluirPostagem(postagem) {
        this._repPostagens.incluir(postagem);
    }
    // Retorna todas as postagens caso não haja argumentos
    consultarPostagens(id, texto, hashtag, perfil) {
        return this._repPostagens.consultar(id, texto, hashtag, perfil);
    }
    curtir(idPostagem) {
        var _postagens = this._repPostagens.consultar(idPostagem);
        if (_postagens.length > 0)
            _postagens[0].curtir();
    }
    descurtir(idPostagem) {
        var _postagens = this._repPostagens.consultar(idPostagem);
        if (_postagens.length > 0)
            _postagens[0].descurtir();
    }
    decrementarVisualizacoes(postagem) {
        if (postagem.visualizacoesRestantes > 0) {
            postagem.decrementarVisualizacoes();
        }
    }
    exibirPostagensPorPerfil(idPerfil) {
        // Encontrar perfil a partir do ID
        const _perfil = this._repPerfis.consultar(idPerfil);
        if (_perfil === null)
            return new Array;
        // Encontrar postagens a partir do perfil
        const _postagens = this._repPostagens.consultar(undefined, undefined, undefined, _perfil);
        const _postagensFiltradas = new Array;
        // Em cada postagem:
        for (let i = 0; i < _postagens.length; i++) {
            var _post = _postagens[i];
            // Essa postagem deverá ser incluída no array.
            var _canPush = true;
            // Se for uma postagem avançada:
            if (_post instanceof postagem_1.PostagemAvancada) {
                // Checar se há visualizações restantes:
                if (_post.visualizacoesRestantes <= 0)
                    _canPush = false;
                // Decrementar visualizações
                this.decrementarVisualizacoes(_post);
            }
            if (_canPush)
                _postagensFiltradas.push(_post);
        }
        return _postagensFiltradas;
    }
    exibirPostagensPorHashtag(hashtag) {
        // Obter todas as postagens que possuem essa hashtag
        const _postagens = this._repPostagens.consultar(undefined, undefined, hashtag, undefined);
        // Array vazio que será alimentado e retornado
        const _postagensFiltradas = new Array;
        // Em cada postagem:
        for (let i = 0; i < _postagens.length; i++) {
            var _post = _postagens[i];
            if (_post instanceof postagem_1.PostagemAvancada) {
                // Checar se há visualizações restantes:
                var _canPush = (_post.visualizacoesRestantes > 0);
                // Decrementar visualizações
                this.decrementarVisualizacoes(_post);
                // Adicionar ao array.
                if (_canPush)
                    _postagensFiltradas.push(_post);
            }
        }
        return _postagensFiltradas;
    }
    /**
     * Obtém os perfis da rede social.
     * @returns Um array de objetos do tipo Perfil.
     */
    obterPerfis() {
        return this._repPerfis.perfis;
    }
    obterPostagens() {
        // Retorna todas as postagens.
        return this._repPostagens.consultar();
    }
    atribuirPerfisCarregados(novosPerfis) {
        this._repPerfis.perfis = novosPerfis;
    }
    atribuirPostagensCarregadas(novasPostagens) {
        this._repPostagens.postagens = novasPostagens;
    }
}
exports.RedeSocial = RedeSocial;

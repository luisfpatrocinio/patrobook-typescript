"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePostagens = void 0;
const postagem_1 = require("./postagem");
class RepositorioDePostagens {
    constructor() {
        this._postagens = new Array;
    }
    incluir(postagem) {
        this._postagens.push(postagem);
    }
    consultar(id, texto, hashtag, perfil) {
        // Retornar todas as postagens caso não hajam argumentos (que podem ser exibidas)
        if (arguments.length == 0) {
            return this._postagens.filter((p) => {
                if (p instanceof postagem_1.PostagemAvancada) {
                    return (p.visualizacoesRestantes > 0);
                }
                return true;
            });
        }
        if (id === undefined && texto === undefined && perfil === undefined) {
            return this._postagens.filter((p) => {
                if (p instanceof postagem_1.PostagemAvancada) {
                    return (p.visualizacoesRestantes > 0);
                }
                return true;
            });
        }
        const postagensEncontradas = new Array;
        if (id != undefined) {
            const postagemPorId = this._postagens.find((p) => p.id === id);
            if (postagemPorId) {
                postagensEncontradas.push(postagemPorId);
            }
        }
        // Obter por Texto:
        if (texto != undefined) {
            this._postagens.forEach((post) => {
                if (post.texto.includes(texto)) {
                    if (!postagensEncontradas.includes(post))
                        postagensEncontradas.push(post);
                }
            });
        }
        // Obter por hashtag
        if (hashtag != undefined) {
            this._postagens.forEach((post) => {
                if (post instanceof postagem_1.PostagemAvancada) {
                    if (!postagensEncontradas.includes(post)) {
                        if (post.existeHashtag(hashtag))
                            postagensEncontradas.push(post);
                    }
                }
            });
        }
        // Obter por perfil
        if (perfil != undefined) {
            this._postagens.forEach((post) => {
                if (post.perfil === perfil) {
                    if (!postagensEncontradas.includes(post))
                        postagensEncontradas.push(post);
                }
            });
        }
        // Precisamos filtrar esse array.
        const postagensFiltradas = postagensEncontradas.filter((post) => {
            // A postagem encontrada pode continuar a menos que conflite com algum outro filtro de pesquisa.
            var _podeEntrar = true;
            if (id != undefined) {
                if (post.id != id)
                    _podeEntrar = false;
            }
            if (texto != undefined) {
                if (!post.texto.includes(texto))
                    _podeEntrar = false;
            }
            if (hashtag != undefined) {
                if (post instanceof postagem_1.PostagemAvancada) {
                    if (!post.existeHashtag(hashtag))
                        _podeEntrar = false;
                }
            }
            if (perfil != undefined)
                if (post.perfil != perfil)
                    _podeEntrar = false;
            return _podeEntrar;
        });
        // Retornar array de postagens que se adequem aos filtros especificados, ainda que seja um array vazio.
        // Porém, apenas as que ainda podem ser exibidas.
        return postagensFiltradas.filter((p) => {
            if (p instanceof postagem_1.PostagemAvancada) {
                return (p.visualizacoesRestantes > 0);
            }
            return true;
        });
    }
    get postagens() {
        return this.postagens;
    }
    set postagens(novasPostagens) {
        this._postagens = novasPostagens;
    }
}
exports.RepositorioDePostagens = RepositorioDePostagens;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemAvancada = exports.Postagem = void 0;
class Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil) {
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _curtidas;
        this._descurtidas = _descurtidas;
        this._data = _data;
        this._perfil = _perfil;
    }
    get id() {
        return this._id;
    }
    get texto() {
        return this._texto;
    }
    get curtidas() {
        return this._curtidas;
    }
    get descurtidas() {
        return this._descurtidas;
    }
    get data() {
        return this._data;
    }
    get perfil() {
        return this._perfil;
    }
    curtir() {
        this._curtidas++;
        return;
    }
    descurtir() {
        this._descurtidas++;
        return;
    }
    ehPopular() {
        // Retorna true caso a quantidade de curtidas seja 50% maior que a quantidade de descurtidas.
        return this._curtidas > 1.5 * this._descurtidas;
    }
}
exports.Postagem = Postagem;
// Classe Postagem Avançada
class PostagemAvancada extends Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoesRestantes) {
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
    }
    get visualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }
    adicionarHashtag(hashtag) {
        this._hashtags.push(hashtag);
        return;
    }
    existeHashtag(hashtag) {
        for (let i = 0; i < this._hashtags.length; i++) {
            if (this._hashtags[i] == hashtag) {
                return true;
            }
        }
        return false;
    }
    decrementarVisualizacoes() {
        if (this._visualizacoesRestantes > 0)
            this._visualizacoesRestantes--;
    }
    get hashtags() {
        return this._hashtags;
    }
}
exports.PostagemAvancada = PostagemAvancada;

import { Perfil } from "./perfil";

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor(_id: number, _texto: string, _curtidas: number, _descurtidas: number, _data: Date, _perfil: Perfil) {
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

    curtir(): void {
        this._curtidas++;
        return
    }

    descurtir(): void {
        this._descurtidas++;
        return
    }

    ehPopular(): boolean {
        // Retorna true caso a quantidade de curtidas seja 50% maior que a quantidade de descurtidas.
        return this._curtidas > 1.5 * this._descurtidas;
    }
}

// Classe Postagem Avançada
export class PostagemAvancada extends Postagem {
    private _hashtags: Array<string>;
    private _visualizacoesRestantes: number;

    constructor(_id: number, _texto: string, _curtidas: number, _descurtidas: number, _data: Date, _perfil: Perfil, _hashtags: Array<string>, _visualizacoesRestantes: number) {
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
    }

    get visualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }

    adicionarHashtag(hashtag: string): void {
        this._hashtags.push(hashtag);
        return
    }

    existeHashtag(hashtag: string): boolean {
        for (let i = 0; i < this._hashtags.length; i++) {
            if (this._hashtags[i] == hashtag) {
                return true;
            }
        }
        return false;
    }
    
    decrementarVisualizacoes(): void {
        if (this._visualizacoesRestantes > 0) this._visualizacoesRestantes--;
    }

    get hashtags() {
        return this._hashtags;
    }
}
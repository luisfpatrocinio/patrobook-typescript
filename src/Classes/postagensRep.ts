import { Postagem, PostagemAvancada } from "./postagem";
import { Perfil } from "./perfil";
import { PostNotFoundError } from "../Exceptions/postExceptions";

export class RepositorioDePostagens {
    private _postagens = new Array<Postagem>;

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
    }

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
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Array<Postagem>{      
        // Exibe todas as postagens caso não haja argumentos. (Usado na obterPostagens da RedeSocial).
        // E também caso não tenha sido inseridos argumentos.
        if (arguments.length == 0 || (id == undefined && texto == undefined && perfil == undefined)) {
            return this._postagens.filter((p) => {
                if (p instanceof PostagemAvancada) {
                    return (p.visualizacoesRestantes > 0);
                }
                return true
            })
        }
        
        // Array das postagens que serão exibidas no final.
        const postagensEncontradas = new Array<Postagem>;

        // Se estivermos procurando por ID:
        if (id != undefined) {
            const postagemPorId = this._postagens.find((p) => p.id === id);
            if (postagemPorId) {
                postagensEncontradas.push(postagemPorId);
            }
        }

        // Se estivermos procurando por texto:
        if (texto != undefined) {
            this._postagens.forEach((post) => {
                if (post.texto.includes(texto)) {
                    if (!postagensEncontradas.includes(post)) postagensEncontradas.push(post);
                }
            })
        }

        // Se estivermos procurando por hashtag:
        if (hashtag != undefined) {
            this._postagens.forEach((post) => {
                if (post instanceof PostagemAvancada) {
                    if (!postagensEncontradas.includes(post)) {
                        if (post.existeHashtag(hashtag)) postagensEncontradas.push(post);
                    }
                }
            });
        }

        // Obter por perfil
        if (perfil != undefined) {
            this._postagens.forEach((post) => {
                if (post.perfil == perfil) {
                    if (!postagensEncontradas.includes(post)) postagensEncontradas.push(post);
                }
            });
        }

        // Precisamos filtrar esse array.
        const postagensFiltradas = postagensEncontradas.filter((post) => {
            // A postagem encontrada pode continuar a menos que conflite com algum outro filtro de pesquisa.
            var _podeEntrar = true;
            if (id != undefined)        {
                if (post.id != id) _podeEntrar = false;
            }
            if (texto != undefined) {
                if (!post.texto.includes(texto)) _podeEntrar = false;
            }
            if (hashtag != undefined) {
                if (post instanceof PostagemAvancada) {
                    if (!post.existeHashtag(hashtag)) _podeEntrar = false;
                } else {
                    // @TODO: Verificar se isso está correto.
                    _podeEntrar = false;
                }
            }
            if (perfil != undefined) {
                if (post.perfil != perfil) {
                    _podeEntrar = false;
                }
            }

            return _podeEntrar;
        })
        
        // Retornar array de postagens que se adequem aos filtros especificados, ainda que seja um array vazio.
        // Porém, apenas as que ainda podem ser exibidas.
        const postagensRetornadas = postagensFiltradas.filter((p) => {
            if (p instanceof PostagemAvancada) {
                return (p.visualizacoesRestantes > 0);
            }
            return true
        });

        if (postagensRetornadas.length <= 0) {
            throw new PostNotFoundError("Não foram encontradas postagens com esses atributos.");
        }

        return postagensRetornadas;
    }

    get postagens(): Array<Postagem> {
        return this.postagens;
    }

    set postagens(novasPostagens: Array<Postagem>) {
        this._postagens = novasPostagens;
    }
}
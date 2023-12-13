import { Postagem, PostagemAvancada } from "../Classes/postagem";
import { Perfil } from "../Classes/perfil";
import { PostNotFoundError } from "../Exceptions/postExceptions";
import { IRepPostagens } from "../Interfaces/IRepPostagens";
import { readFileSync, writeFileSync } from "fs";
import { enterToContinue } from "../Utils/ioUtils";

export class RepositorioDePostagens implements IRepPostagens {
    private _postagens = new Array<Postagem>;
    private _postagensFavoritas = new Array<Postagem>;

    constructor() {
        this.carregarPostagens();
    }

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
    }

    carregarPostagens(): void {
        let postagens = new Array<Postagem | PostagemAvancada>;
        let postagensString = new Array<String>;

        try {
            // Ler arquivo de postagens
            let _conteudo = readFileSync("savePostagens.txt", "utf-8").split("\n");

            // Percorrer conteudo e adicionar as postagens
            for (let i = 0; i < _conteudo.length; i++) {
                if (_conteudo[i] != "") {
                    postagensString.push(_conteudo[i]);
                }
            }

            // Para cada postagem em string:
            postagensString.forEach((post) => {
                if (post != "") {   // @TODO: Checar se essa checagem é necessária.
                    // Separar elementos:
                    let _fichaPostagem: Array<string> = post.split("|");

                    // Conferir se é uma postagem avançada:
                    let _advanced = (_fichaPostagem[1] === "1") ? true : false;

                    // Criar um registro com id e nome:
                    let _cadastroPostagem: Postagem | PostagemAvancada;
                    
                    let _perfilID = Number(_fichaPostagem[6]);
                    let _perfil: Perfil = new Perfil(-1, "", "");   // Temporariamente atribuímos um perfil sem nome e email.
            
                    let _curtidas = Number(_fichaPostagem[3]);
                    let _descurtidas = Number(_fichaPostagem[4]);
                    let _data = new Date(); // @TODO: Pegar a data correta a partir do arquivo.
                    
                    if (_perfil != null) {
                        if (_advanced) {
                            var _hashtags = _fichaPostagem[7].split("¨");
                            var _visualizacoes = Number(_fichaPostagem[8]);
                            _cadastroPostagem = new PostagemAvancada(Number(_fichaPostagem[0]), _fichaPostagem[2], _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoes);
                        } else {
                            _cadastroPostagem = new Postagem(Number(_fichaPostagem[0]), _fichaPostagem[2], _curtidas, _descurtidas, _data, _perfil);
                        }

                        // Adicionar ao array de postagens.
                        postagens.push(_cadastroPostagem);

                        // Conferir se é favorita:
                        if (Boolean(Number(_fichaPostagem[8]))) {
                            this._postagensFavoritas.push(_cadastroPostagem);
                        }
                    }
                }
            });
            
            // Postagens carregadas
            this._postagens = postagens;

        } catch (err) {
            console.log(err);
        }
    }

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

    salvar (): void {
        let saveString = "";
        for (let i = 0; i < this._postagens.length; i++) {
            var p: Postagem | PostagemAvancada = this._postagens[i];
            var _isAdvanced = p instanceof PostagemAvancada;
            var _adv = String(Number(_isAdvanced));

            // Tratamentos em caso de postagem avançada:
            var _hashtagsString = "";
            var _views = "";
            if (p instanceof PostagemAvancada) {
                // @TODO: Adicionar um get para obter as hashtags
                for (let h = 0; h < p.hashtags.length; h++) {
                    _hashtagsString += p.hashtags[h];
                    if (h + 1 < p.hashtags.length) {
                        _hashtagsString += "¨";
                    }
                }
                _views = String(p.visualizacoesRestantes);
            }

            var _isFavorite = this._postagensFavoritas.includes(p) ? "1" : "0";
            
            // @TODO: Colocar a data da postagem de maneira correta.
            saveString += `${p.id}|${_adv}|${p.texto}|${p.curtidas}|${p.descurtidas}|40|${p.perfil.id}|${_hashtagsString}|${_views}|${_isFavorite}\n`
        }

        const file = writeFileSync("savePostagens.txt", saveString)
    }
}
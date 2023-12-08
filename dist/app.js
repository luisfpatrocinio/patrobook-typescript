"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importar bibliotecas principais:
const perfil_1 = require("./Classes/perfil");
const postagem_1 = require("./Classes/postagem");
const redeSocial_1 = require("./Classes/redeSocial");
const option_1 = require("./Classes/option");
// Importar Utils
const ioUtils_1 = require("./Utils/ioUtils");
const viewUtils_1 = require("./Utils/viewUtils");
const generalUtils_1 = require("./Utils/generalUtils");
// Leitura e Gravação de Arquivos
const fs_1 = require("fs");
const profileExceptions_1 = require("./Exceptions/profileExceptions");
const userError_1 = require("./Exceptions/userError");
const postExceptions_1 = require("./Exceptions/postExceptions");
// Visual
const chalk = require('chalk');
class App {
    constructor() {
        // Atributos necessários para gerenciar os IDs dos perfis e postagens.
        this._qntPerfisCriados = 0;
        this._qntPostagensCriadas = 0;
        this._postagensFavoritas = [];
        this.menuOpcoes = [
            // Nome da opção, função a ser executada, condição para habilitar a opção
            new option_1.Option("Criar Perfil", this.criarPerfil, () => true),
            new option_1.Option("Listar Perfis", this.listarPerfis, () => this._redeSocial.obterPerfis().length > 0),
            new option_1.Option("Editar Perfis", this.editarPerfis, () => this._redeSocial.obterPerfis().length > 0),
            new option_1.Option("Excluir Perfil", this.excluirPerfil, () => this._redeSocial.obterPerfis().length > 0),
            new option_1.Option("Criar Postagem", this.criarPostagem, () => this._redeSocial.obterPerfis().length > 0),
            new option_1.Option("Ver Feed", this.verFeed, () => this._redeSocial.obterPostagens().length > 0),
            new option_1.Option("Consultar Postagens", this.consultarPostagens, () => this._redeSocial.obterPostagens().length > 0),
            new option_1.Option("Exibir Postagens por Perfil", this.exibirPostagensPorPerfil, () => this._redeSocial.obterPostagens().length > 0 && this._redeSocial.obterPerfis().length > 0),
            new option_1.Option("Exibir Postagens por Hashtag", this.exibirPostagensPorHashtag, () => this._redeSocial.obterPostagens().length > 0),
            new option_1.Option("Exibir Postagens Populares", this.exibirPostagensPopulares, () => this._redeSocial.obterPostagens().length > 0),
            new option_1.Option("Exibir Postagens Favoritas", this.exibirPostagensFavoritas, () => this._postagensFavoritas.length > 0),
            new option_1.Option("Exibir Hashtags Populares", this.exibirHashtagsPopulares, () => this._redeSocial.obterPostagens().length > 0)
        ];
        this._opcaoSelecionada = 0;
        this._redeSocial = new redeSocial_1.RedeSocial;
        try {
            // Carregar Arquivos caso hajam.
            this.carregarPerfis();
            this.carregarPostagens();
        }
        catch (erro) {
            // Iniciando pela primeira vez.
            (0, viewUtils_1.mainBackground)();
            (0, viewUtils_1.exibirTextoNoCentro)("Iniciando pela primeira vez.");
            (0, ioUtils_1.enterToContinue)();
        }
    }
    wakeUpScreen() {
        (0, viewUtils_1.mainBackground)();
        (0, viewUtils_1.saltarLinhas)(Math.floor((0, viewUtils_1.obterAlturaTerminal)() / 2) - 6);
        (0, viewUtils_1.showBlogLogo)();
        let col = "#D0DA91";
        const f = (_texto) => {
            return (0, viewUtils_1.exibirTextoNoCentro)(_texto, false, col);
        };
        f(`Desenvolvido por `);
        f(`Luis Felipe dos Santos Patrocinio`);
        f(`Herminio de Barros e Silva Neto`);
        f(``);
        f(`Primeira Avaliação de P.O.O.`);
        f(`Prof. Ely Miranda`);
        f(``);
        var _qntPerfis = this._redeSocial.obterPerfis().length;
        if (_qntPerfis > 0)
            (0, viewUtils_1.exibirTextoNoCentro)(`${_qntPerfis} perfis carregados`);
        var _qntPostagens = this._redeSocial.obterPostagens().length;
        if (_qntPostagens > 0)
            (0, viewUtils_1.exibirTextoNoCentro)(`${_qntPostagens} postagens carregadas`);
        (0, viewUtils_1.exibirTextoNoCentro)(``);
    }
    // Funções de Salvar e Carregar
    salvarPerfis() {
        let saveString = "";
        var _perfis = this._redeSocial.obterPerfis();
        saveString += `perfisCriados:${this._qntPerfisCriados}\n`;
        for (let i = 0; i < _perfis.length; i++) {
            var _perfil = _perfis[i];
            if (_perfil != null) {
                saveString += `${_perfil.id}|${_perfil.nome}|${_perfil.email}\n`;
            }
        }
        const file = (0, fs_1.writeFileSync)("savePerfis.txt", saveString);
    }
    carregarPerfis() {
        // Ler Arquivos
        let perfis = new Array;
        let perfisString = new Array;
        try {
            // Ler arquivo de perfis "savePerfis.txt"
            let _conteudo = (0, fs_1.readFileSync)("savePerfis.txt", "utf-8").split("\n");
            // Percorrer conteudo e adicionar aos perfis
            if (_conteudo.length > 0)
                this._qntPerfisCriados = Number(_conteudo[0].split(":")[1]);
            for (let i = 1; i < _conteudo.length; i++) {
                if (_conteudo[i] != "") {
                    perfisString.push(_conteudo[i]);
                }
            }
            // Para cada linha do arquivo
            for (let i = 0; i < perfisString.length; i++) {
                if (perfisString[i] != "") {
                    // Separar o id e o nome
                    let _perfil = perfisString[i].split("|");
                    // Criar um registro com id e nome
                    let _cadastroPerfil = new perfil_1.Perfil(Number(_perfil[0]), _perfil[1], _perfil[2]);
                    // Adicionar o objeto no vetor de perfis
                    perfis[i] = _cadastroPerfil;
                }
            }
            // @TODO: Deve-se aqui atribuir as postagens a cada perfil, talvez?
            this._redeSocial.atribuirPerfisCarregados(perfis);
            this.salvarPerfis();
        }
        catch (err) {
            // mainBackground();
            // saltarLinhas(obterLarguraTerminal()/2);
            // exibirTextoCentralizado("Não foram encontrados perfis.");
            // enterToContinue();
        }
    }
    salvarPostagens() {
        let saveString = "";
        saveString += `postagensCriadas:${this._qntPostagensCriadas}\n`;
        var _postagens = this._redeSocial.obterPostagens();
        for (let i = 0; i < _postagens.length; i++) {
            var p = _postagens[i];
            var _isAdvanced = p instanceof postagem_1.PostagemAvancada;
            var _adv = String(Number(_isAdvanced));
            // Tratamentos em caso de postagem avançada:
            var _hashtagsString = "";
            var _views = "";
            if (p instanceof postagem_1.PostagemAvancada) {
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
            saveString += `${p.id}|${_adv}|${p.texto}|${p.curtidas}|${p.descurtidas}|40|${p.perfil.id}|${_hashtagsString}|${_views}|${_isFavorite}\n`;
        }
        const file = (0, fs_1.writeFileSync)("savePostagens.txt", saveString);
    }
    carregarPostagens() {
        let postagens = new Array;
        let postagensString = new Array;
        try {
            // Ler arquivo de postagens
            let _conteudo = (0, fs_1.readFileSync)("savePostagens.txt", "utf-8").split("\n");
            if (_conteudo.length > 0)
                this._qntPostagensCriadas = Number(_conteudo[0].split(":")[1]);
            // Percorrer conteudo e adicionar as postagens
            for (let i = 1; i < _conteudo.length; i++) {
                if (_conteudo[i] != "") {
                    postagensString.push(_conteudo[i]);
                }
            }
            // Para cada postagem em string:
            postagensString.forEach((post) => {
                if (post != "") { // @TODO: Checar se essa checagem é necessária.
                    // Separar elementos:
                    let _fichaPostagem = post.split("|");
                    // Conferir se é uma postagem avançada:
                    let _advanced = (_fichaPostagem[1] === "1") ? true : false;
                    // Criar um registro com id e nome:
                    let _cadastroPostagem;
                    let _perfilID = Number(_fichaPostagem[6]);
                    let _perfil = this._redeSocial.consultarPerfil(_perfilID, undefined, undefined);
                    let _curtidas = Number(_fichaPostagem[3]);
                    let _descurtidas = Number(_fichaPostagem[4]);
                    let _data = new Date(); // @TODO: Pegar a data correta a partir do arquivo.
                    if (_perfil != null) {
                        if (_advanced) {
                            var _hashtags = _fichaPostagem[7].split("¨");
                            var _visualizacoes = Number(_fichaPostagem[8]);
                            _cadastroPostagem = new postagem_1.PostagemAvancada(Number(_fichaPostagem[0]), _fichaPostagem[2], _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoes);
                        }
                        else {
                            _cadastroPostagem = new postagem_1.Postagem(Number(_fichaPostagem[0]), _fichaPostagem[2], _curtidas, _descurtidas, _data, _perfil);
                        }
                        // Adicionar ao array de postagens.
                        postagens.push(_cadastroPostagem);
                        this._qntPostagensCriadas++;
                        // Conferir se é favorita:
                        if (Boolean(Number(_fichaPostagem[8]))) {
                            this._postagensFavoritas.push(_cadastroPostagem);
                        }
                    }
                }
            });
            // Postagens carregadas
            this._redeSocial.atribuirPostagensCarregadas(postagens);
        }
        catch (err) {
        }
    }
    // Solicita uma opção ao usuário.
    obterOpcao() {
        var opcoes = this.obterMenuParaExibir();
        var min = 0;
        var max = opcoes.length; // A opção máxima é 1 a mais, porque ainda tem a opção SAIR.
        var rsync = require('readline-sync');
        var key = rsync.keyIn('', {
            hideEchoBack: true,
            mask: '',
            limit: 'ZXCzxc ',
            hideCursor: true,
        });
        if (key.toString().toLowerCase() == 'z')
            this._opcaoSelecionada--;
        else if (key.toString().toLowerCase() == 'x')
            this._opcaoSelecionada++;
        else {
            if (this._opcaoSelecionada == max)
                return 0;
            return this._opcaoSelecionada + 1;
        }
        if (this._opcaoSelecionada < min)
            this._opcaoSelecionada = max;
        if (this._opcaoSelecionada > max)
            this._opcaoSelecionada = min;
        return -1;
    }
    obterMenuParaExibir() {
        let menu = new Array;
        // Filtramos o menu, para mostrar apenas as opções que satisfaçam a função de Option.condition.
        for (let i = 0; i < this.menuOpcoes.length; i++) {
            var opt = this.menuOpcoes[i];
            if (opt.condition()) {
                menu.push(opt);
            }
        }
        return menu;
    }
    exibirMenu() {
        (0, viewUtils_1.mainBackground)();
        (0, viewUtils_1.showBlogLogo)();
        (0, viewUtils_1.exibirTextoNoCentro)("~ Menu Principal ~");
        (0, viewUtils_1.exibirTextoNoCentro)("[Z-X] - movimentar, [C-Espaço] - confirmar");
        // O menu exibido será o menu 
        const menuParaExibir = this.obterMenuParaExibir();
        for (let i = 0; i < menuParaExibir.length; i++) {
            let selectedStr = (i === this._opcaoSelecionada) ? "> " : "";
            if (i === this._opcaoSelecionada) {
                (0, viewUtils_1.exibirTextoEsquerda)(chalk.inverse.bold(`${selectedStr} ${menuParaExibir[i].text}`));
            }
            else {
                (0, viewUtils_1.exibirTextoEsquerda)(`${selectedStr} - ${menuParaExibir[i].text}`);
            }
        }
        var onExit = this._opcaoSelecionada === menuParaExibir.length;
        let selectedStr = (onExit) ? "> " : "";
        if (onExit) {
            (0, viewUtils_1.exibirTextoEsquerda)(chalk.bold.inverse(`${selectedStr} Sair`));
        }
        else {
            (0, viewUtils_1.exibirTextoEsquerda)(`${selectedStr} - Sair`);
        }
    }
    executarOpcao(opcao) {
        if (opcao == 0) {
            // Opcção de sair.
            this.despedida();
            return;
        }
        const opcoesValidas = this.obterMenuParaExibir();
        let funcao = opcoesValidas[opcao - 1].callback;
        funcao.call(this);
        (0, ioUtils_1.enterToContinue)();
    }
    despedida() {
        (0, viewUtils_1.limparTerminal)();
        (0, viewUtils_1.mainBackground)();
        (0, viewUtils_1.saltarLinhas)(Math.floor((0, viewUtils_1.obterAlturaTerminal)() / 2) - 1);
        (0, ioUtils_1.exibirTextoCentralizado)("Obrigado e volte sempre!");
        (0, ioUtils_1.enterToContinue)();
    }
    criarPerfil() {
        (0, viewUtils_1.cabecalhoPrincipal)("Criar Perfil");
        let id = this._qntPerfisCriados + 1;
        let nome = (0, ioUtils_1.obterTexto)("Nome: ");
        let tentativas = 0;
        // Verificar se o nome existe.
        try {
            this._redeSocial.consultarPerfil(undefined, nome, undefined);
            throw new profileExceptions_1.ProfileAlreadyExistsError();
        }
        catch (_e) {
            if (_e instanceof profileExceptions_1.ProfileAlreadyExistsError) {
                throw new profileExceptions_1.ProfileAlreadyExistsError("Perfil com esse nome já existe.");
            }
        }
        // Se o nome for vazio:
        if (nome.length <= 0) {
            throw new userError_1.UserCancelError("Ação cancelada pelo usuário.");
        }
        // Obter email
        let email;
        do {
            // @TODO: Apagar a última linha caso nao tenha sido inserido email válido.
            // @TODO: Criar uma outra função para obter o input do usuario, limitando a não inserir caracteres especiais. (basicOptions)
            email = (0, ioUtils_1.obterTexto)("Email: ");
            tentativas = 0;
            try {
                this._redeSocial.consultarPerfil(undefined, undefined, email);
                throw new profileExceptions_1.EmailAlreadyExistsError();
            }
            catch (_e) {
                if (_e instanceof profileExceptions_1.EmailAlreadyExistsError) {
                    throw new profileExceptions_1.EmailAlreadyExistsError("Perfil com esse email já existe.");
                }
            }
            if (email.length <= 0) {
                throw new userError_1.UserCancelError("Ação cancelada pelo usuário.");
            }
        } while (!email.includes("@") || !email.includes("."));
        let perfil = new perfil_1.Perfil(id, nome, email);
        this._redeSocial.incluirPerfil(perfil);
        (0, viewUtils_1.exibirTextoNoCentro)(`Perfil ${nome} criado com sucesso.`);
        (0, viewUtils_1.exibirTextoNoCentro)(`ID: ${id}`);
        this._qntPerfisCriados++;
        this.salvarPerfis();
    }
    criarPostagem() {
        (0, viewUtils_1.cabecalhoPrincipal)("Criar Postagem");
        let id = this._qntPostagensCriadas + 1;
        let curtidas = 0;
        let descurtidas = 0;
        // Tentar obter perfil:
        let perfil = this.selecionarPerfil();
        if (perfil === null) {
            (0, ioUtils_1.exibirTexto)("Perfil não encontrado.");
            return;
        }
        if (perfil != null) {
            (0, viewUtils_1.prepararTelaPostagem)(perfil);
            let texto = (0, ioUtils_1.obterTexto)("Texto: ");
            // A data é obtida após escrever a postagem.
            let data = new Date;
            // Identificar se é uma postagem avançada.
            var advanced = texto.includes("#");
            var _postagem;
            if (advanced) {
                // Encontrar hashtags:
                var _hashtags = (0, generalUtils_1.extrairHashtags)(texto);
                // Remover hashtags do texto.
                _postagem = new postagem_1.PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, _hashtags, 10);
            }
            else {
                _postagem = new postagem_1.Postagem(id, texto, curtidas, descurtidas, data, perfil);
            }
            this._redeSocial.incluirPostagem(_postagem);
            this._qntPostagensCriadas++;
            (0, viewUtils_1.exibirTextoNoCentro)(`Postagem No ${id} criada com sucesso.`);
        }
        this.salvarPostagens();
    }
    listarPerfisCurto() {
        let perfis = this._redeSocial.obterPerfis();
        // Percorre os perfis e lista seus IDs e Nomes
        for (let i = 0; i < perfis.length; i++) {
            var _perfil = perfis[i];
            (0, ioUtils_1.exibirTexto)(`${_perfil.id} - ${_perfil.nome}`);
        }
        // Caso não haja perfis.
        // OBS: Confirmar se isso chega a acontecer.
        if (perfis.length == 0) {
            (0, ioUtils_1.exibirTexto)("Nenhum perfil encontrado.");
        }
    }
    listarPerfis() {
        let perfis = this._redeSocial.obterPerfis();
        var _perfisPorPagina = 4;
        var _pagina = 0;
        var _totalPaginas = Math.ceil(perfis.length / _perfisPorPagina);
        while (_pagina < _totalPaginas) {
            (0, viewUtils_1.cabecalhoPrincipal)("Perfis Cadastrados");
            for (let i = 0; i < _perfisPorPagina; i++) {
                // Obter número do perfil de acordo com a página.
                var n = _pagina * _perfisPorPagina + i;
                if (n >= perfis.length)
                    break;
                var _p = perfis[n];
                (0, ioUtils_1.exibirTexto)(`ID ${_p.id}:`);
                (0, ioUtils_1.exibirTexto)(`Nome: ${_p.nome}`);
                (0, ioUtils_1.exibirTexto)(`Email: ${_p.email}`);
                (0, viewUtils_1.exibirTextoNoCentro)(`x`);
                console.log();
            }
            (0, viewUtils_1.exibirTextoNoCentro)(`[AVANÇAR]`);
            _pagina++;
            if (_pagina < _totalPaginas) {
                (0, ioUtils_1.enterToContinue)();
            }
        }
    }
    favoritarPostagem(_postagem) {
        var _ind = this._postagensFavoritas.indexOf(_postagem);
        if (_ind !== -1) {
            // A postagem já está favoritada, então a removeremos
            this._postagensFavoritas.splice(_ind, 1);
        }
        else {
            // A postagem não está nos favoritos, então a adicionaremos
            this._postagensFavoritas.push(_postagem);
        }
    }
    exibirPostagens(postagens, header = "") {
        // Checa se há postagens:
        if (postagens.length <= 0) {
            throw new postExceptions_1.PostNotFoundError(`Não há postagens a serem exibidas.`);
        }
        var rsync = require('readline-sync');
        var _pagina = 0;
        var _postsPorPagina = Math.floor(((0, viewUtils_1.obterAlturaTerminal)() - 10) / 4);
        _postsPorPagina = 4;
        var _totalPaginas = Math.ceil(postagens.length / _postsPorPagina);
        let indPost = 0; // postagem selecionada
        var postsDecrementadosDessaVez = [];
        while (_pagina < _totalPaginas) {
            // Cabeçalho
            (0, viewUtils_1.cabecalhoPrincipal)(header);
            var min = 0;
            var max = 0;
            // Percorrer postagens
            for (let i = 0; i < _postsPorPagina; i++) {
                // Obter número da postagem de acordo com a página.
                var n = _pagina * _postsPorPagina + i;
                if (n >= postagens.length)
                    break;
                max++;
                // Post atual:
                var _post = postagens[n];
                var isFavorite = this._postagensFavoritas.includes(_post);
                var isPopular = _post.ehPopular();
                // Exibir textos da postagem:
                var _dataString = _post.data.toUTCString();
                var _nome = _post.perfil.nome;
                if (isFavorite) {
                    _nome = `[♥] ` + _nome;
                }
                if (isPopular) {
                    _nome = `[P] ` + _nome;
                }
                var _spac = (0, viewUtils_1.obterLarguraTerminal)() - 2 - _dataString.length - _nome.length;
                _spac = Math.max(_spac, 6);
                var _postHeader = `${_nome}:${" ".repeat(_spac - 5)}${_dataString}  `;
                var _postHeaderColor, _postHeaderBGColor;
                if (i == indPost) {
                    _postHeaderColor = '#FFFFFF';
                    _postHeaderBGColor = '#be772b';
                }
                else {
                    _postHeaderColor = '#FFFFFF';
                    _postHeaderBGColor = (0, viewUtils_1.obterCorDoFundo)();
                }
                (0, ioUtils_1.exibirTexto)(chalk.bgHex(_postHeaderBGColor).hex(_postHeaderColor)(_postHeader));
                (0, ioUtils_1.exibirTextoPostagem)(`${_post.texto}`, "#FFFFFF");
                var _curtidasStr = `${_post.curtidas} curtidas, ${_post.descurtidas} descurtidas.`;
                if (i == indPost) {
                    var _newText = `[F] ${this._postagensFavoritas.includes(_post) ? "Unfav." : "Fav."}, [A] Like, [S] Dislike`;
                    var _spac = (0, viewUtils_1.obterLarguraTerminal)() - 10 - _curtidasStr.length - _newText.length;
                    _spac = Math.max(0, _spac);
                    _curtidasStr += ' '.repeat(_spac) + _newText;
                }
                if (_post instanceof postagem_1.PostagemAvancada) {
                    // Reduzir views
                    if (!postsDecrementadosDessaVez.includes(_post)) {
                        _post.decrementarVisualizacoes();
                        postsDecrementadosDessaVez.push(_post);
                    }
                    var _viewsStr = `(${_post.visualizacoesRestantes})`;
                    var _n = (0, viewUtils_1.obterLarguraTerminal)() - 2 - _curtidasStr.length - 2 - _viewsStr.length;
                    _n = Math.max(0, _n);
                    _curtidasStr += `${' '.repeat(_n)}${_viewsStr}`;
                }
                (0, ioUtils_1.exibirTexto)(_curtidasStr);
                (0, viewUtils_1.exibirTextoNoCentro)("-=-");
                console.log();
            }
            (0, viewUtils_1.exibirTextoNoCentro)(`Página ${_pagina + 1}/${_totalPaginas}`);
            if (indPost == max) {
                (0, viewUtils_1.exibirTextoNoCentro)(`[AVANÇAR]`, true);
            }
            else {
                (0, viewUtils_1.exibirTextoNoCentro)(`[AVANÇAR]`);
            }
            var key = rsync.keyIn('', {
                hideEchoBack: true,
                mask: '',
                limit: 'FfAaSsZXCzxc ',
                hideCursor: true,
            });
            key = key.toString().toLowerCase();
            if (key == 'z')
                indPost--;
            if (key == 'x')
                indPost++;
            var _indexPostSelecionado = _pagina * _postsPorPagina + indPost;
            var _post = postagens[_indexPostSelecionado];
            if (key == 'a')
                _post.curtir();
            if (key == 's')
                _post.descurtir();
            if (key == 'f')
                this.favoritarPostagem(_post);
            indPost = Math.min(indPost, max);
            indPost = Math.max(indPost, min);
            this.salvarPostagens();
            if (key == 'c' && _pagina < _totalPaginas) {
                _pagina++;
                indPost = 0;
            }
        }
    }
    consultarPostagens() {
        (0, viewUtils_1.cabecalhoPrincipal)("Consultar Postagens");
        // Qual perfil será editado:
        let idDesejado = (0, ioUtils_1.obterNumeroInteiro)("ID: ");
        let textoDesejado = (0, ioUtils_1.obterTexto)("Texto: ");
        let hashtagDesejada = (0, ioUtils_1.obterTexto)("Hashtag: ");
        // let perfilDesejado: Perfil | null | undefined = this.selecionarPerfil();
        if (!idDesejado)
            idDesejado = undefined;
        if (!textoDesejado)
            textoDesejado = undefined;
        if (!hashtagDesejada)
            hashtagDesejada = undefined;
        // if (!perfilDesejado)    perfilDesejado = undefined;
        let postagensDesejadas = this._redeSocial.consultarPostagens(idDesejado, textoDesejado, hashtagDesejada, undefined);
        this.exibirPostagens(postagensDesejadas, "Postagens Encontradas:");
    }
    verFeed() {
        let postagens = this._redeSocial.obterPostagens();
        (0, viewUtils_1.cabecalhoPrincipal)("PatroFeed");
        this.exibirPostagens(postagens, "PatroFeed");
    }
    selecionarPerfil() {
        // Exibir de forma sintetizada os perfis disponíveis.
        this.listarPerfisCurto();
        (0, ioUtils_1.exibirTexto)(`${0} - Cancelar`);
        // Inicializar variável que vai guardar o perfil.
        let perfilParaEditar;
        // Receber atributo desejado do usuário
        (0, ioUtils_1.exibirTexto)("Qual perfil? (ID/Nome/Email)");
        let atributoDesejado = (0, ioUtils_1.obterTexto)("");
        if (String(atributoDesejado) === '0' || String(atributoDesejado) === '') {
            throw new userError_1.UserCancelError();
        }
        // O valor inserido é um número? Se sim, deve ser tratado como ID.
        if (!isNaN(Number(atributoDesejado))) {
            perfilParaEditar = this._redeSocial.consultarPerfil(Number(atributoDesejado), undefined, undefined);
        }
        else {
            // Verificar se é email:
            if (atributoDesejado.includes("@") && atributoDesejado.includes(".")) {
                perfilParaEditar = this._redeSocial.consultarPerfil(undefined, undefined, atributoDesejado);
            }
            else {
                // Atributo desejado é nome:
                perfilParaEditar = this._redeSocial.consultarPerfil(undefined, atributoDesejado, undefined);
            }
        }
        return perfilParaEditar;
    }
    editarPerfis() {
        (0, viewUtils_1.cabecalhoPrincipal)("Editar Perfis");
        // Qual perfil será editado:
        let perfilParaEditar = this.selecionarPerfil();
        (0, ioUtils_1.exibirTexto)(`Vamos então editar o perfil: ${perfilParaEditar.nome}`);
        var novoNome = (0, ioUtils_1.obterTexto)("Novo nome: ");
        if (novoNome.length <= 0)
            novoNome = perfilParaEditar.nome;
        var novoEmail = (0, ioUtils_1.obterTexto)("Novo email: ");
        if (novoEmail.length <= 0)
            novoEmail = perfilParaEditar.email;
        var _sucess = 0;
        if (novoNome != perfilParaEditar.nome)
            _sucess += 1;
        if (novoEmail != perfilParaEditar.email)
            _sucess += 2;
        var _successString = ``;
        switch (_sucess) {
            case 0:
                throw new userError_1.UserCancelError("Não foram feitas alterações.");
            case 1:
                _successString = `Nome alterado com sucesso.`;
                break;
            case 2:
                _successString = `Email alterado com sucesso.`;
                break;
            case 3:
                _successString = `Nome e email alterados com sucesso.`;
                break;
        }
        // Cria um novo array de perfis sem o perfil editado.
        var perfis = this._redeSocial.obterPerfis().filter((p) => {
            if (perfilParaEditar)
                return (p.id != perfilParaEditar.id);
            return false;
        });
        // Adiciona o perfil editado novamente ao array de perfis.
        var novoPerfil = new perfil_1.Perfil(perfilParaEditar.id, novoNome, novoEmail);
        perfis.push(novoPerfil);
        // Organiza o array de perfis com base em seus IDs.
        perfis.sort((a, b) => {
            return a.id - b.id;
        });
        // Atualizar perfis no repositório.
        this._redeSocial.atribuirPerfisCarregados(perfis);
        // Salva.
        this.salvarPerfis();
        // Exibe mensagem de sucesso anteriormente definida.
        (0, viewUtils_1.exibirTextoNoCentro)(_successString);
    }
    exibirPostagensPorPerfil() {
        (0, viewUtils_1.cabecalhoPrincipal)("Exibir Postagens por Perfil");
        let perfil = this.selecionarPerfil();
        (0, ioUtils_1.exibirTexto)(`Exibindo postagens de ${perfil.nome}`);
        let postagensDoPerfil;
        try {
            // Obtém um array de postagens do perfil solicitado.
            postagensDoPerfil = this._redeSocial.obterPostagens().filter((p) => {
                if (perfil != null) {
                    return p.perfil.id == perfil.id;
                }
                return false;
            });
        }
        catch (_e) {
            // Se não houver postagens:
            if (_e instanceof postExceptions_1.PostNotFoundError) {
                throw new postExceptions_1.PostNotFoundError(`Não há postagens do perfil ${perfil.nome}.`);
            }
            return;
        }
        // Com as postagens do perfil específico:
        this.exibirPostagens(postagensDoPerfil, `Postagens de ${perfil.nome}:`);
    }
    exibirPostagensPorHashtag() {
        (0, viewUtils_1.cabecalhoPrincipal)("Exibir Postagens por Hashtag");
        let hashtag = (0, ioUtils_1.obterTexto)("Hashtag: ");
        // Cancelando:
        if (hashtag.length <= 0) {
            (0, ioUtils_1.exibirTexto)("Cancelando...");
            return;
        }
        // Procurar por todas as postagens.
        let postagens = this._redeSocial.obterPostagens();
        // Ver quais possuem a hashtag desejada
        let postagensFiltradas = postagens.filter((p) => {
            if (p instanceof postagem_1.PostagemAvancada) {
                return p.existeHashtag(hashtag);
            }
        });
        if (postagensFiltradas.length <= 0) {
            (0, ioUtils_1.exibirTexto)("Não há postagens com essa hashtag.");
            return;
        }
        this.exibirPostagens(postagensFiltradas, `Postagens com Hashtag "#${hashtag}":`);
    }
    excluirPerfil() {
        (0, viewUtils_1.cabecalhoPrincipal)("Excluir Perfil");
        let perfil = this.selecionarPerfil();
        // Gerar um novo array de perfis que não contém o perfil escolhido.
        let novosPerfis = this._redeSocial.obterPerfis().filter((p) => {
            return (p != perfil);
        });
        (0, viewUtils_1.exibirTextoNoCentro)(`Perfil ${perfil.nome} excluído com sucesso.`);
        this._redeSocial.atribuirPerfisCarregados(novosPerfis);
        this.salvarPerfis();
    }
    exibirPostagensPopulares() {
        (0, viewUtils_1.cabecalhoPrincipal)("Exibir Postagens Populares");
        // Procurar por todas as postagens.
        let postagens = this._redeSocial.obterPostagens();
        // Ver quais são populares
        let postagensFiltradas = postagens.filter((p) => {
            return (p.ehPopular());
        });
        try {
            this.exibirPostagens(postagensFiltradas, `Postagens Populares:`);
        }
        catch (_e) {
            if (_e instanceof postExceptions_1.PostNotFoundError) {
                throw new postExceptions_1.PostNotFoundError(`Não há postagens populares.`);
            }
        }
    }
    exibirPostagensFavoritas() {
        (0, viewUtils_1.cabecalhoPrincipal)("Exibir Postagens Favoritas");
        // Procurar por todas as postagens.
        let postagens = this._postagensFavoritas.filter((p) => {
            if (p instanceof postagem_1.PostagemAvancada) {
                return (p.visualizacoesRestantes > 0);
            }
            return true;
        });
        try {
            this.exibirPostagens(postagens, `Postagens Favoritas:`);
        }
        catch (_e) {
            if (_e instanceof postExceptions_1.PostNotFoundError) {
                throw new postExceptions_1.PostNotFoundError(`Não há postagens favoritas.`);
            }
        }
    }
    exibirHashtagsPopulares() {
        (0, viewUtils_1.cabecalhoPrincipal)("Exibir Hashtags Populares");
        // Procurar por todas as postagens.
        let postagens = this._redeSocial.obterPostagens();
        // Armazenar tags
        let tags = [];
        postagens.forEach((p) => {
            if (p instanceof postagem_1.PostagemAvancada) {
                p.hashtags.forEach((h) => {
                    tags.push(h);
                });
            }
        });
        if (tags.length <= 0) {
            (0, ioUtils_1.exibirTexto)("Não há postagens com hashtags.");
            return;
        }
        // Crie um mapa (dicionário) para contar as hashtags
        const contadorHashtags = {};
        // Percorra todas as hashtags e conte as ocorrências
        tags.forEach((hashtag) => {
            // Se existir: soma
            if (contadorHashtags[hashtag]) {
                contadorHashtags[hashtag]++;
            }
            else {
                // Se
                contadorHashtags[hashtag] = 1;
            }
        });
        // Converta o mapa em um array de pares chave-valor e ordene-o
        const hashtagsMaisComuns = Object.entries(contadorHashtags)
            .sort((a, b) => b[1] - a[1]).slice(0, 5);
        for (const [hashtag, contagem] of hashtagsMaisComuns) {
            (0, viewUtils_1.exibirTextoNoCentro)(`#${hashtag}: ${contagem}`);
        }
    }
    executar() {
        // Checar tamanho da janela
        if ((0, viewUtils_1.obterLarguraTerminal)() < 64) {
            (0, viewUtils_1.mainBackground)();
            (0, viewUtils_1.saltarLinhas)(Math.floor((0, viewUtils_1.obterAlturaTerminal)() / 2 - 3));
            (0, ioUtils_1.exibirTextoPostagem)("Por favor, ajuste o tamanho da janela do terminal antes de executar a aplicação.");
            (0, ioUtils_1.enterToContinue)();
            return;
        }
        // Tela de início
        this.wakeUpScreen();
        (0, ioUtils_1.enterToContinue)();
        // Menu:
        let opcao = -1;
        while (opcao != 0) {
            try {
                (0, viewUtils_1.limparTerminal)();
                this.exibirMenu();
                opcao = this.obterOpcao();
                // console.log("opção: " + String(opcao)); enterToContinue();
                if (opcao >= 0) {
                    this.executarOpcao(opcao);
                }
            }
            catch (_e) {
                (0, ioUtils_1.exibirTextoCentralizado)("--- ERRO ---");
                (0, ioUtils_1.exibirTextoCentralizado)(_e.message);
                (0, ioUtils_1.exibirTextoCentralizado)("-");
                (0, ioUtils_1.enterToContinue)();
            }
        }
        (0, viewUtils_1.limparTerminal)();
        (0, ioUtils_1.exibirTextoCentralizado)("=== FIM ===");
    }
}
function main() {
    const app = new App();
    app.executar();
}
main();

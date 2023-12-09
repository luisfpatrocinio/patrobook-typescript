"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = exports.saltarLinhas = exports.feedView = exports.prepararTelaPostagem = exports.cabecalhoPrincipal = exports.showBlogLogo = exports.exibirTextoCentroCentro = exports.mainBackground = exports.exibirTextoEsquerda = exports.exibirTextoNoCentro = exports.limparTerminal = exports.obterAlturaTerminal = exports.obterLarguraTerminal = exports.obterCorDoFundo = exports.textCol = void 0;
var readline = require('readline');
const chalk = require('chalk');
const BG_COLOR = '#1e1d39';
const BG_COLOR2 = '#402751';
const SEL_COLOR = '#a4dddb';
const ioUtils_1 = require("./ioUtils");
function textCol(texto, color = "#FFFFFF", bgColor = "000000") {
    if (bgColor === undefined) {
        bgColor = obterCorDoFundo();
    }
    return chalk.bgHex(bgColor).hex(color)(texto);
}
exports.textCol = textCol;
function obterCorDoFundo() {
    var _bgHex;
    var _bgHeight = Math.floor(obterAlturaTerminal() / 5);
    // var _y = readline.getCursorPos().rows;
    var _y = 0;
    var _nv = Math.floor(_y / _bgHeight);
    switch (_nv) {
        case 0:
            _bgHex = '#172038';
            break;
        case 1:
            _bgHex = '#253a5e';
            break;
        case 2:
            _bgHex = '#3c5e8b';
            break;
        case 3:
            _bgHex = '#4f8fba';
            break;
        case 4:
            _bgHex = '#73bed3';
            break;
        default:
            _bgHex = '#ebede9';
            break;
    }
    return _bgHex;
}
exports.obterCorDoFundo = obterCorDoFundo;
function obterLarguraTerminal() {
    return process.stdout.columns;
}
exports.obterLarguraTerminal = obterLarguraTerminal;
function obterAlturaTerminal() {
    return process.stdout.rows;
}
exports.obterAlturaTerminal = obterAlturaTerminal;
function limparTerminal() {
    console.clear();
}
exports.limparTerminal = limparTerminal;
function exibirTextoNoCentro(texto, inverse = false, color = "#FFFFFF") {
    var _x = Math.floor((obterLarguraTerminal() - texto.length) / 2);
    readline.cursorTo(process.stdout, _x);
    if (inverse) {
        console.log(chalk.bgHex(BG_COLOR).hex(color).inverse(texto));
    }
    else {
        console.log(chalk.bgHex(BG_COLOR).hex(color)(texto));
    }
}
exports.exibirTextoNoCentro = exibirTextoNoCentro;
function exibirTextoEsquerda(texto) {
    readline.cursorTo(process.stdout, 2);
    console.log(chalk.bgHex(BG_COLOR).hex("#FFFFFF")(texto));
}
exports.exibirTextoEsquerda = exibirTextoEsquerda;
function mainBackground() {
    limparTerminal();
    for (let i = 0; i < obterAlturaTerminal(); i++) {
        const h = (texto) => {
            return textCol(texto, '#a23e8c', '#1e1d39');
        };
        if (i == 0)
            console.log(h(`${"=".repeat(obterLarguraTerminal())}`));
        if (i > 1 && i < obterAlturaTerminal() - 2)
            console.log(`${h("|")}${h(" ".repeat(obterLarguraTerminal() - 2))}${h("|")}`);
        if (i == obterAlturaTerminal() - 1)
            console.log(`${h("=".repeat(obterLarguraTerminal()))}`);
    }
    // Rodapé
    readline.cursorTo(process.stdout, 1, obterAlturaTerminal() - 4);
    var _data = new Date;
    var _dataStr = `${_data.toUTCString()}`;
    exibirTextoNoCentro(`${_dataStr}`);
    // Mover cursor para o início da tela:
    readline.cursorTo(process.stdout, 1, 1);
}
exports.mainBackground = mainBackground;
function exibirTextoCentroCentro(texto) {
    var _x = Math.floor(obterLarguraTerminal() / 2 - texto.length / 2);
    var _y = Math.floor(obterAlturaTerminal() / 2);
    readline.cursorTo(process.stdout, _x, _y);
}
exports.exibirTextoCentroCentro = exibirTextoCentroCentro;
function showBlogLogo() {
    // Fonte: Straight
    // http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Straight&t=Patrobook
    const c = (texto) => {
        return textCol(texto, '#e98537', obterCorDoFundo());
        // return texto
    };
    const title = [
        "__                 __              ",
        "|__)  _  |_  _  _  |__)  _   _  |  ",
        "|    (_| |_ |  (_) |__) (_) (_) |( ",
        "                                   "
    ];
    title.forEach((t) => {
        var _x = Math.floor((obterLarguraTerminal() - t.length) / 2);
        readline.cursorTo(process.stdout, _x);
        console.log(chalk.bold.hex('#e8c170').bgHex(BG_COLOR)(t));
    });
}
exports.showBlogLogo = showBlogLogo;
function cabecalhoPrincipal(texto) {
    mainBackground();
    showBlogLogo();
    exibirTextoNoCentro(`~ ${texto} ~`);
}
exports.cabecalhoPrincipal = cabecalhoPrincipal;
function prepararTelaPostagem(perfil) {
    cabecalhoPrincipal("Criar Postagem");
    var _header = `Perfil: ${perfil.nome} (${perfil.email})`;
    if (_header.length > obterLarguraTerminal() - 4) {
        _header = `Perfil: ${perfil.nome}`;
    }
    exibirTextoEsquerda(_header);
    readline.cursorTo(process.stdout, 2);
}
exports.prepararTelaPostagem = prepararTelaPostagem;
function feedView() {
}
exports.feedView = feedView;
function saltarLinhas(quantidade) {
    for (let i = 0; i < quantidade; i++) {
        console.log();
    }
}
exports.saltarLinhas = saltarLinhas;
function showError(_e) {
    (0, ioUtils_1.exibirTextoCentralizado)("--- ERRO ---");
    (0, ioUtils_1.exibirTextoCentralizado)(_e.message);
    (0, ioUtils_1.exibirTextoCentralizado)("-");
    (0, ioUtils_1.enterToContinue)();
}
exports.showError = showError;
// @TODO: Rodapé com informações:
// Quantidade de perfis criados
// Quantidade de postagens criadas
// Hashtags, etc
// Curtidas

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterTexto = exports.enterToContinue = exports.exibirTextoCentralizado = exports.exibirTextoPostagem = exports.exibirTexto = exports.obterNumeroInteiro = void 0;
const readline_sync_1 = require("readline-sync");
const viewUtils_1 = require("./viewUtils");
var readline = require('readline');
const readline_sync_2 = require("readline-sync");
const chalk = require('chalk');
function obterNumeroInteiro(mensagem) {
    readline.cursorTo(process.stdout, 2);
    let numero = Number((0, readline_sync_1.question)(mensagem));
    while (isNaN(numero)) {
        exibirTexto("Número inválido. Tente novamente.");
        numero = Number((0, readline_sync_1.question)(mensagem));
    }
    return numero;
}
exports.obterNumeroInteiro = obterNumeroInteiro;
function exibirTexto(texto) {
    readline.cursorTo(process.stdout, 2);
    var _bgHex = (0, viewUtils_1.obterCorDoFundo)();
    var _col = "#FFFFFF";
    console.log(chalk.bgHex(_bgHex).hex(_col)(texto));
}
exports.exibirTexto = exibirTexto;
/**
 * Exibe o texto da postagem, quebrando-o para caber na janela.
 * @param texto O texto da postagem.
 * @param color A cor do texto (opcional, padrão é "#FFFFFF").
 */
function exibirTextoPostagem(texto, color = "#FFFFFF") {
    let _tamanho = (0, viewUtils_1.obterLarguraTerminal)() - 4;
    for (let i = 0; i < texto.length; i += _tamanho) {
        var _pedaco = texto.substring(i, i + _tamanho);
        // REGEX: Uso de expressão regular para encontrar hashtags no pedaço
        _pedaco = _pedaco.replace(/#(\w+)/g, (match, hashtag) => {
            // Destaque as hashtags com uma cor usando o chalk
            return chalk.hex('#df84a5').bgHex((0, viewUtils_1.obterCorDoFundo)())(`#${hashtag}`);
        });
        readline.cursorTo(process.stdout, 2);
        console.log(chalk.hex(color).bgHex((0, viewUtils_1.obterCorDoFundo)())(_pedaco));
    }
}
exports.exibirTextoPostagem = exibirTextoPostagem;
function exibirTextoCentralizado(texto) {
    var larguraTerminal = (0, viewUtils_1.obterLarguraTerminal)() - 2;
    var espacos = Math.floor((larguraTerminal - texto.length) / 2);
    exibirTexto(" ".repeat(espacos) + texto);
}
exports.exibirTextoCentralizado = exibirTextoCentralizado;
function enterToContinue() {
    var _text = "[C/Espaço - Continuar]";
    var _x = Math.floor((0, viewUtils_1.obterLarguraTerminal)() / 2 - _text.length / 2);
    readline.cursorTo(process.stdout, _x);
    console.log(chalk.bgHex((0, viewUtils_1.obterCorDoFundo)())(_text));
    (0, readline_sync_2.keyInPause)('', { mask: '', limit: 'c ' });
}
exports.enterToContinue = enterToContinue;
function obterTexto(texto) {
    readline.cursorTo(process.stdout, 2);
    return (0, readline_sync_1.question)(texto).replace("|", "_").replace("¨", "_").trim();
}
exports.obterTexto = obterTexto;

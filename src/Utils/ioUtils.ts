import { question } from "readline-sync"; 
import { obterCorDoFundo, obterLarguraTerminal } from "./viewUtils";
var readline = require('readline');
import { keyInPause } from 'readline-sync'
const chalk = require('chalk');



export function obterNumeroInteiro(mensagem: string): number {
    readline.cursorTo(process.stdout, 2);
    let numero: number = Number(question(mensagem));
    while (isNaN(numero)) {
        exibirTexto("Número inválido. Tente novamente.");
        numero = Number(question(mensagem));
    }
    return numero;
}

export function exibirTexto(texto: string): void {
    readline.cursorTo(process.stdout, 2);
    var _bgHex = obterCorDoFundo();
    var _col = "#FFFFFF";
    console.log(chalk.bgHex(_bgHex).hex(_col)(texto));
}

export function exibirTextoPostagem(texto: string, color: string = "#FFFFFF"): void {
    let _tamanho = obterLarguraTerminal() - 4;
    for (let i = 0; i < texto.length; i += _tamanho) {
        var _pedaco = texto.substring(i, i + _tamanho);

        // REGEX: Uso de expressão regular para encontrar hashtags no pedaço
        _pedaco = _pedaco.replace(/#(\w+)/g, (match, hashtag) => {
            // Destaque as hashtags com uma cor usando o chalk
            return chalk.hex('#df84a5').bgHex(obterCorDoFundo())(`#${hashtag}`);
        }); 

        readline.cursorTo(process.stdout, 2);
        console.log(chalk.hex(color).bgHex(obterCorDoFundo())(_pedaco));
    }
}

export function exibirTextoCentralizado(texto: string): void {
    var larguraTerminal: number = obterLarguraTerminal() - 2;
    var espacos: number = Math.floor((larguraTerminal - texto.length) / 2);
    exibirTexto(" ".repeat(espacos) + texto);
}

export function enterToContinue(): void {
    var _text = "[C/Espaço - Continuar]";
    var _x = Math.floor(obterLarguraTerminal()/2 - _text.length/2);
    readline.cursorTo(process.stdout, _x);
    console.log(chalk.bgHex(obterCorDoFundo())(_text));
    keyInPause('', {mask: '', limit: 'c '})
}

export function obterTexto(texto: string): string {
    readline.cursorTo(process.stdout, 2);
    return question(texto).replace("|", "_").replace("¨", "_").trim();
}

var readline = require('readline');
const chalk = require('chalk');

const BG_COLOR = '#1e1d39'
const BG_COLOR2 = '#402751'
const SEL_COLOR = '#a4dddb'

import { Perfil } from "../Classes/perfil";

export function textCol(texto: string, color: string = "#FFFFFF", bgColor: string = "000000") {
    if (bgColor === undefined) {
        bgColor = obterCorDoFundo();
    }
    return chalk.bgHex(bgColor).hex(color)(texto);
}

export function obterCorDoFundo(): string{
    var _bgHex: string;
    var _bgHeight: number = Math.floor(obterAlturaTerminal() / 5);
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

export function obterLarguraTerminal(): number {
    return process.stdout.columns;
}

export function obterAlturaTerminal(): number {
    return process.stdout.rows;
}

export function limparTerminal(): void {
    console.clear();
}

export function exibirTextoNoCentro(texto: string, inverse: boolean = false, color: string = "#FFFFFF"): void {
    var _x = Math.floor((obterLarguraTerminal() - texto.length) / 2);
    readline.cursorTo(process.stdout, _x);
    if (inverse) {
        console.log(chalk.bgHex(BG_COLOR).hex(color).inverse(texto));
    } else {
        console.log(chalk.bgHex(BG_COLOR).hex(color)(texto));
    }
}

export function exibirTextoEsquerda(texto: string): void {
    readline.cursorTo(process.stdout, 2);
    console.log(chalk.bgHex(BG_COLOR).hex("#FFFFFF")(texto));
}

export function mainBackground(): void{
    limparTerminal();
    for (let i = 0; i < obterAlturaTerminal(); i++) {
        const h = (texto: string) => {
            return textCol(texto, '#a23e8c', '#1e1d39')
        };
        if (i == 0) console.log(h(`${"=".repeat(obterLarguraTerminal())}`));
        if (i > 1 && i < obterAlturaTerminal() - 2) console.log(`${h("|")}${h(" ".repeat(obterLarguraTerminal() - 2))}${h("|")}`);
        if (i == obterAlturaTerminal() - 1) console.log(`${h("=".repeat(obterLarguraTerminal()))}`);
    }

    // Rodapé
    readline.cursorTo(process.stdout, 1, obterAlturaTerminal() - 4);
    var _data = new Date;
    var _dataStr = `${_data.toUTCString()}`;
    exibirTextoNoCentro(`${_dataStr}`);


    // Mover cursor para o início da tela:
    readline.cursorTo(process.stdout, 1, 1);   
}

export function exibirTextoCentroCentro(texto: string): void {
    var _x = Math.floor(obterLarguraTerminal()/2 - texto.length/2)
    var _y = Math.floor(obterAlturaTerminal()/2);
    readline.cursorTo(process.stdout, _x, _y);
}

export function showBlogLogo(): void {
    // Fonte: Straight
    // http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Straight&t=Patrobook
    
    const c = (texto: string) => {
        return textCol(texto, '#e98537', obterCorDoFundo())
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

export function cabecalhoPrincipal(texto: string): void {
    mainBackground();
    showBlogLogo();
    exibirTextoNoCentro(`~ ${texto} ~`);
}

export function prepararTelaPostagem(perfil: Perfil): void {
    cabecalhoPrincipal("Criar Postagem");
    var _header = `Perfil: ${perfil.nome} (${perfil.email})`;
    if (_header.length > obterLarguraTerminal() - 4) {
        _header = `Perfil: ${perfil.nome}`
    }
    exibirTextoEsquerda(_header);
    readline.cursorTo(process.stdout, 2);
}

export function feedView() : void {
    
}

export function saltarLinhas(quantidade: number): void {
    for (let i = 0; i < quantidade; i++) {
        console.log();
    }
}

// @TODO: Rodapé com informações:
// Quantidade de perfis criados
// Quantidade de postagens criadas
// Hashtags, etc
// Curtidas
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
/**
 * Representa uma opção em um menu ou lista de opções.
 */
class Option {
    /**
     * Cria uma nova instância da classe Option.
     * @param text O texto da opção.
     * @param callback A função de retorno de chamada que será executada quando a opção for selecionada.
     * @param condition A condição que determina se a opção está disponível para exibição.
     */
    constructor(text, callback, condition) {
        this.text = text;
        this.callback = callback;
        this.condition = condition;
    }
}
exports.Option = Option;

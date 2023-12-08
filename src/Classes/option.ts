/**
 * Representa uma opção em um menu ou lista de opções.
 */
export class Option {
    /**
     * O texto da opção.
     */
    public text: string;

    /**
     * A função de retorno de chamada que será executada quando a opção for selecionada.
     */
    public callback: () => void;

    /**
     * A condição que determina se a opção está disponível para exibição.
     */
    public condition: () => boolean;

    /**
     * Cria uma nova instância da classe Option.
     * @param text O texto da opção.
     * @param callback A função de retorno de chamada que será executada quando a opção for selecionada.
     * @param condition A condição que determina se a opção está disponível para exibição.
     */
    constructor(text: string, callback: () => void, condition: () => boolean) {
        this.text = text;
        this.callback = callback;
        this.condition = condition;
    }
}
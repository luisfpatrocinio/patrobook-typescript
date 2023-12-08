export class AppError extends Error {
    constructor(message: string = "Erro de Sistema") {
        super(message);
        this.name = "AppError";
    }
}
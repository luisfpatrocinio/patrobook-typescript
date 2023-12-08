import { AppError } from "./appError";

export class PostError extends AppError {
    constructor(message: string = "Erro de Postagem") {
        super(message);
        this.name = "PostError";
    }
}

export class PostNotFoundError extends PostError {
    constructor(message: string = "Post não encontrado") {
        super(message);
        this.name = "PostNotFoundError";
    }
}


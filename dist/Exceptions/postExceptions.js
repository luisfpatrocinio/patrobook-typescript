"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNotFoundError = exports.PostError = void 0;
const appError_1 = require("./appError");
class PostError extends appError_1.AppError {
    constructor(message = "Erro de Postagem") {
        super(message);
        this.name = "PostError";
    }
}
exports.PostError = PostError;
class PostNotFoundError extends PostError {
    constructor(message = "Post não encontrado") {
        super(message);
        this.name = "PostNotFoundError";
    }
}
exports.PostNotFoundError = PostNotFoundError;

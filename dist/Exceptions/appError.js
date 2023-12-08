"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message = "Erro de Sistema") {
        super(message);
        this.name = "AppError";
    }
}
exports.AppError = AppError;

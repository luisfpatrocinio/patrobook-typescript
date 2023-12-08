"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = exports.ProfileAlreadyExistsError = exports.ProfileNotFoundError = exports.ProfileError = void 0;
const appError_1 = require("./appError");
class ProfileError extends appError_1.AppError {
    constructor(message = "Erro de Perfil") {
        super(message);
        this.name = "ProfileError";
    }
}
exports.ProfileError = ProfileError;
class ProfileNotFoundError extends ProfileError {
    constructor(message = "Perfil não encontrado.") {
        super(message);
        this.name = "ProfileNotFoundError";
    }
}
exports.ProfileNotFoundError = ProfileNotFoundError;
class ProfileAlreadyExistsError extends ProfileError {
    constructor(message = "Perfil já existe.") {
        super(message);
        this.name = "ProfileAlreadyExistsError";
    }
}
exports.ProfileAlreadyExistsError = ProfileAlreadyExistsError;
class EmailAlreadyExistsError extends ProfileError {
    constructor(message = "Email já existe.") {
        super(message);
        this.name = "EmailAlreadyExistsError";
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;

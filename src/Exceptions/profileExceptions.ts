import { AppError } from "./appError";

export class ProfileError extends AppError {
    constructor(message: string = "Erro de Perfil") {
        super(message);
        this.name = "ProfileError";
    }
}

export class ProfileNotFoundError extends ProfileError {
    constructor(message: string = "Perfil não encontrado.") {
        super(message);
        this.name = "ProfileNotFoundError";
    }
}

export class ProfileAlreadyExistsError extends ProfileError {
    constructor(message: string = "Perfil já existe.") {
        super(message);
        this.name = "ProfileAlreadyExistsError";
    }
}

export class EmailAlreadyExistsError extends ProfileError {
    constructor(message: string = "Email já existe.") {
        super(message);
        this.name = "EmailAlreadyExistsError";
    }
}
import { AppError } from "./appError";

export class UserCancelError extends AppError {
    constructor(message: string = "Ação cancelada pelo usuário.") {
        super(message);
        this.name = "UserCancelError";
    }
}
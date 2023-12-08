"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCancelError = void 0;
const appError_1 = require("./appError");
class UserCancelError extends appError_1.AppError {
    constructor(message = "Ação cancelada pelo usuário.") {
        super(message);
        this.name = "UserCancelError";
    }
}
exports.UserCancelError = UserCancelError;

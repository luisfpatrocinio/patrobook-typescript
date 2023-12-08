"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extrairHashtags = exports.sleep = void 0;
function sleep(time = 100) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(void 0);
            }, time);
        });
    });
}
exports.sleep = sleep;
function extrairHashtags(texto) {
    // Use uma expressão regular para encontrar todas as hashtags na string
    const hashtags = texto.match(/#\w+/g);
    // Verifique se foram encontradas hashtags
    if (hashtags) {
        // Remova o caractere '#' de cada hashtag
        const hashtagsLimpa = hashtags.map(tag => tag.slice(1));
        return hashtagsLimpa;
    }
    else {
        return [];
    }
}
exports.extrairHashtags = extrairHashtags;

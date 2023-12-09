"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pilha = void 0;
class Pilha {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length == 0;
    }
}
exports.Pilha = Pilha;

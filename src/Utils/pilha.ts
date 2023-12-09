export class Pilha<T> {
    public items: Array<T> = [];

    push(element: T) {
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
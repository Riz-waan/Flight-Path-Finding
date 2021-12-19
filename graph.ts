export class Node {
    // deno-lint-ignore no-explicit-any
    id: any;
    weight: number;
    // deno-lint-ignore no-explicit-any
    constructor(id: any, weight: number) {
        this.id = id;
        this.weight = weight;
    }

    getID() {
        return this.id;
    }

    getWeight() {
        return this.weight;
    }
}

export class Edge {
    begin: Node
    end: Node
    weight: number
    constructor(begin: Node, end: Node, weight: number) {
        this.begin = begin;
        this.end = end;
        this.weight = weight;
    }

    getEnd() {
        return this.end;
    }

    getBegin() {
        return this.begin;
    }

    getWeight() {
        return this.weight;
    }
}
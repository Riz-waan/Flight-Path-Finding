import { Node, Edge } from "./graph.ts";

export class Airport extends Node {
    constructor(code: string, wait: number) {
        super(code, wait);
    }

    getCode() {
        return super.getID();
    }

    getWait() {
        return super.getWeight();
    }
}

export class Route extends Edge {

    constructor(departure: Airport, arrival: Airport, duration: number) {
        super(departure, arrival, duration);
    }


    getStart() {
        return super.getBegin();
    }

    getAr() {
        return super.getEnd();
    }

    getDestination(start: Airport) {
        if (start === this.getStart()) {
            return this.getAr();
        }
        if (start === this.getAr()) {
            return this.getStart();
        }
        return null;
    }

    getDuration() {
        return super.getWeight();
    }

}

export class DijiStore {
    public weight: number;
    public from: Route;
    public permenant: boolean;
    // deno-lint-ignore no-explicit-any
    constructor(weight: number, from: any) {
        this.weight = weight;
        this.from = new Route(new Airport("Start", 0), new Airport("Start", 0), 0);
        if (from instanceof Route) {
            this.from = from;
        }
        this.permenant = false;
    }
}
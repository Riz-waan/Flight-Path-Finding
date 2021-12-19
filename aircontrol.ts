
import { Airport, Route, DijiStore } from "./airstruct.ts";

export class AirControl {
    map: Map<Airport, Array<Route>>
    airportDirect: Map<string, Airport>

    constructor(airports: Array<Airport>, routes: Array<Route>) {
        this.map = new Map();
        this.airportDirect = new Map();
        // deno-lint-ignore no-explicit-any
        airports.forEach((lo: any) => this.addNode(lo));
        // deno-lint-ignore no-explicit-any
        routes.forEach((lo: any) => this.addEdge(lo));
    }

    private addNode(airport: Airport) {

        this.map.set(airport, []);

        this.airportDirect.set(airport.getCode(), airport);
    }

    private addEdge(route: Route) {
        this.map.get(route.getStart() as Airport)?.push(route);

        this.map.get(route.getAr() as Airport)?.push(route);


    }

    // deno-lint-ignore no-explicit-any
    private recursivePathFinder(db: Map<string, DijiStore>, to: string): any {

        let lowest = "Nada";
        let lowestNumber = -1;
        db.forEach((value: DijiStore, key: string) => {
            if (value.permenant === false) {
                if (lowestNumber === -1) {
                    lowest = key;
                    lowestNumber = value.weight;
                } else if (value.weight < lowestNumber) {
                    lowest = key;
                    lowestNumber = value.weight;
                }
            }
        });
        if (lowest === "Nada") {
            return false;
        }
        const k = db.get(lowest);
        if (k === undefined) {
            return false;
        }
        k.permenant = true;
        db.set(lowest, k);

        if (lowest === to) {
            return db;
        }

        const tmp = this.airportDirect.get(lowest);
        if (tmp === undefined) {
            return false
        }
        const newRoutes = this.map.get(tmp);
        // deno-lint-ignore no-explicit-any
        newRoutes?.forEach((kp: any) => {
            const cd2 = kp.getDestination(this.airportDirect.get(lowest));
            const cd = cd2.getCode();
            const mol = db.get(cd);
            if (k !== undefined) {
                const nw = k.weight + kp.getDuration() + cd2.getWait();

                if (mol === undefined) {
                    db.set(cd, new DijiStore(nw, kp))
                } else if (nw < mol.weight) {
                    db.set(cd, new DijiStore(nw, kp))
                }
            }
        });

        return this.recursivePathFinder(db, to);
    }

    private findPath(from: string, to: string) {
        const start = this.airportDirect.get(from);
        if (start === undefined) {
            return false;
        }
        const initialRoutes = this.map.get(start);
        const db = new Map();
        const l = new DijiStore(start.getWait(), null);
        l.permenant = true;
        db.set(from, l);
        // deno-lint-ignore no-explicit-any
        initialRoutes?.forEach((route: any) => {
            db.set(route.getDestination(start).getCode(), new DijiStore(db.get(from).weight + route.getDuration() + route.getDestination(start).getWeight(), route))
        });
        return this.recursivePathFinder(db, to);
    }

    routeFinder(from: string, to: string) {
        const k = this.findPath(from, to);
        if (k === false) {
            return ["No route has been found"];
        }

        let j = k.get(to);
        const pt = [];
        let m = to;


        while (j.from.getStart().getCode() !== "Start") {
            const ap = this.airportDirect.get(m);
            const newm = j.from.getDestination(ap).getCode();

            pt.push(ap);
            pt.push(j.from);
            j = k.get(newm)
            m = newm

        }
        pt.push(this.airportDirect.get(from));
        let prev: Airport | undefined;
        const out = []
        while (pt.length !== 0) {
            const it = pt.pop();
            if (it instanceof Airport) {
                out.push("You spend " + it.getWait() + " minutes at the " + it.getCode() + " airport.");
                prev = it;
            }

            if (it instanceof Route && prev !== undefined) {
                const t = it.getDestination(prev);
                if (t instanceof Airport) {
                    out.push("You take a " + it.getDuration() + " minute flight from " + prev.getCode() + " to " + t.getCode() + ".")
                }
            }
        }
        out.push("")
        out.push("Your trip takes a total of " + k.get(to).weight + " minutes.")
        return out;
    }
}
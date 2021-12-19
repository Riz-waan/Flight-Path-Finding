
import { Airport, Route } from "./airstruct.ts"

import { AirControl } from "./aircontrol.ts"

const CHA = new Airport("CHA", 25);
const ATL = new Airport("ATL", 75);
const CLT = new Airport("CLT", 50);
const ORD = new Airport("ORD", 75);
const DAL = new Airport("DAL", 60);
const DET = new Airport("DET", 60);
const MCO = new Airport("MCO", 40);
const TPA = new Airport("TPA", 40);
const IAD = new Airport("IAD", 60);

const airports = [CHA, ATL, CLT, ORD, DAL, DET, MCO, TPA, IAD];

const DETORD = new Route(DET, ORD, 50);
const ORDIAD = new Route(ORD, IAD, 120);
const ORDDAL = new Route(ORD, DAL, 350);
const ORDCHA = new Route(ORD, CHA, 120);
const ORDCLT = new Route(ORD, CLT, 75);
const IADCLT = new Route(IAD, CLT, 60);
const CLTCHA = new Route(CLT, CHA, 175);
const CLTMCO = new Route(CLT, MCO, 250);
const CHAATL = new Route(CHA, ATL, 90);
const CHAMCO = new Route(CHA, MCO, 120);
const DALMCO = new Route(DAL, MCO, 300);
const ATLMCO = new Route(ATL, MCO, 50);
const ATLTPA = new Route(ATL, TPA, 60);
const MCOTPA = new Route(MCO, TPA, 30);

const routes = [DETORD, ORDIAD, ORDDAL, ORDCHA, ORDCLT, IADCLT, CLTCHA, CLTMCO, CHAATL, CHAMCO, DALMCO, ATLMCO, ATLTPA, MCOTPA]

const map = new AirControl(airports, routes);

if (Deno.args.length === 2) {
    console.log(map.routeFinder(Deno.args[0], Deno.args[1]).join("\n"));
} else {
    console.log(map.routeFinder("CHA", "ATL").join("\n"));
}

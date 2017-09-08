import { A, B, C, AFactory, BFactory, CLookup } from "./src/contracts";
import { PropertyHelper } from "./src/property-helper.service";

const bFactory = new BFactory();
const cLookup = new CLookup([{ id: 1 }, { id: 2 }]);

const aFactory = new AFactory(new PropertyHelper(), new BFactory(), cLookup);

const a = exec(() => aFactory.create({ bId: 1, cId: 1, date: '2017-1-1' }));

test(() => a.date instanceof Date);
test(() => a.b instanceof B);

exec(() => a.b = null);
test(() => a.bId === null);

exec(() => a.bId = null)
test(() => a.b === null);

exec(() => a.b = new B({ id: 2 }));
test(() => a.bId === 2);

test(() => a.bName === 'name: undefined');

exec(() => a.b.name = 'bob');
test(() => a.bName === 'name: bob');

test(() => a.c instanceof C);
test(() => a.c === cLookup[1]);

exec(() => a.cId = 2);
test(() => a.c === cLookup[2]);

function exec(fn: () => any | void): any | void {

    const fnString = getFnString(fn);
    log(fnString)

    return fn();
}

function test(assert: () => boolean, text: string = ''): void {

    const fnString = getFnString(assert);

    assert()
        ? console.info('\t✓', fnString, text)
        : console.error('\t×', fnString, text)
}

function getFnString(fn: () => any | void): string {

    return fn.toString().replace(/(^.*?\{ return |contracts_1.|\}$)/g, "");
}

function log(text: string): void {

    console.log('>', text);
}

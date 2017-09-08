import { PropertyHelper } from "./property-helper.service";

export class A {

    constructor(data?: any) {
        if (data) Object.assign(this, data)
    }

    readonly id: number;

    date: Date;

    bId: number;
    b: B;

    readonly bName: string;

    cId: number;
    c: C;
}

export class B {

    constructor(data?: any) {
        if (data) Object.assign(this, data)
    }

    readonly id: number;
    name: string;
}

export class C {

    constructor(data?: any) {
        if (data) Object.assign(this, data)
    }

    readonly id: number;
}

export class AFactory {

    constructor(
        private readonly property: PropertyHelper,
        private readonly bFactory: BFactory,
        private readonly cLookup: { [id: number]: C }
    ) { }

    create(data: any): A {

        const model = Object.assign(new A(),
            data,
            {
                date: new Date(data.date)
            });

        this.property.dependantById(
            model, 'b', 'bId', id => this.bFactory.create({ id: id }));
        this.property.dependant(
            model, m => m.b && m.b.name, 'bName', name => `name: ${name}`);

        this.property.dependantById(
            model, 'c', 'cId', id => this.cLookup[id]);

        return model;
    }
}

export class BFactory {

    create(data: any): B {

        return Object.assign(new B(), data);
    }
}

export class CLookup {

    constructor(data: any[]) {
        if (data) data.forEach(d => {
            var c = new C(d);
            this[c.id] = c;
        });

    }

    [id: number]: C;
}
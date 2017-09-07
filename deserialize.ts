export class A {

    id: number;

    date: Date;

    bId: number;
    readonly b: B;
}

export class B {

    id: number;
}

export class AFactory {

    constructor(
        private readonly createB: BFactory
    ) { }

    create(data: any): A {

        const createB = this.createB.create;

        return Object.assign(new A(),
            data,
            {
                get b(): B {

                    return createB({ id: data.bId });
                },
                date: new Date(data.date)
            });
    }
}

export class BFactory {

    create(data: any): B {

        return Object.assign(new B(), data);
    }
}


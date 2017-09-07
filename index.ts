import { A, B, AFactory, BFactory } from "./deserialize";

const aFactory = new AFactory(new BFactory());

const a = aFactory.create({ bId: 1, date: '2017-1-1' });

console.log('a.date is instanceof Date', a.date instanceof Date);
console.log('a.b is instanceof B', a.b instanceof B);

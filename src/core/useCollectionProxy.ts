import { createCollectionProxy } from './../utils/withProxy';
const s = new Map();
const map = createCollectionProxy(s);

map.set('name', 'jack');
console.log(map.get('name'));
map.set('sex', 'male');
console.log(map.get('sex'));

console.log(s.get('name'));

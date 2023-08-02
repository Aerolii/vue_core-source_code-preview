import { createCollectionsProxy } from '@/reactive/proxy-collections';

const map = new Map();
map.set('name', 'smith');

const mapProxy = createCollectionsProxy(map);

const p = mapProxy.get('name');
console.log('p :>> ', p);

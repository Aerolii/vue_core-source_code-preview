// reactive

import { mutableHandlers } from './baseHandlers';
import { mutableCollectionHandlers } from './collectionHandlers';

export const enum ReactiveFlags {
  RAW = '__v_raw',
}

export interface Target {
  [ReactiveFlags.RAW]: any;
}

export const reactiveWeakMap = new WeakMap<Target, any>();

const createReactiveObject = (target, baseHandlers, collectionHandlers) => {};

// proxy 代理
const reactiveProxy = (obj: any) => {
  return createReactiveObject(obj, mutableHandlers, mutableCollectionHandlers);
};

// 集合代理

import { isObject } from '@/utils/withProxy';

export const enum ReactiveFlags {
  // SKIP = '__v_skip',
  // IS_REACTIVE = '__v_isReactive',
  // IS_READONLY = '__v_isReadonly',
  // IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
}

const wrap = (v: object) => (isObject(v) ? v : v);

const toRaw = (observe: any): any => {
  const raw = observe && observe[ReactiveFlags.RAW];
  return raw ? toRaw(observe) : observe;
};

const get = (target: any, key: any) => {
  target = target[ReactiveFlags.RAW];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);

  const { has } = Reflect.getPrototypeOf(rawTarget) as any;

  if (has.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
};

const collectionsGetter = function () {
  return (target: any, key: unknown, receiver: any) => {
    if (key === ReactiveFlags.RAW) {
      return target;
    }

    return Reflect.get(
      {
        get(this, k: any) {
          return get(this, k);
        },
      },
      key,
      receiver
    );
  };
};
const collectionHandlers = {
  get: collectionsGetter(),
};

export const createCollectionsProxy = (target: object) => {
  return new Proxy(target, collectionHandlers);
};

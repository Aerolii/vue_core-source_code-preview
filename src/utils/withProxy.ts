// 设置对象代理
// export const createObjProxy = <T extends object>(obj: T) => Proxy
// // const createObjProxy = (params) => {}
// export const createObjProxy = (obj: object) => {
//   return new Proxy(obj, {
//     get() {}
//   })
// }

// export function createObjProxy<T extends object>(obj: T)

export const createObjProxy = <T extends object>(obj: T) => {
  return new Proxy(obj, {
    get(target, key) {
      return (target as any)[key];
    },
  });
};

// 创建map set 代理
function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

const objectToString = Object.prototype.toString;

const toTypeString = (val: unknown): string => objectToString.call(val);

const toRawType = (val: unknown): string => toTypeString(val).slice(8, -1);

const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2,
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION;
    default:
      return TargetType.INVALID;
  }
}

const targetMap = new WeakMap<any, any>();

// eslint-disable-next-line no-undef
const track = (rawTarget, key) => {
  if (!targetMap.has(rawTarget)) {
    targetMap.set(rawTarget, new Map(key, rawTarget));
  } else {
    targetMap.set(rawTarget, new Map(key, rawTarget));
  }
};

const mutableInstrumentations = () => {
  return (target: Map<any, any> | WeakMap<any, any>, key, receiver) => {
    console.log('target :>> ', target);
    return Reflect.get(
      {
        get(this: Map<any, any>, key: unknown) {
          console.log('this :>> ', this);
          if (!targetMap.has(target)) {
            targetMap.set(target, this);
          }

          console.log('targetMap :>> ', targetMap);
          return target.get(key);
        },
        set(this: Map<any, any>, key: unknown, value: unknown) {
          target.set(key, value);
          return this;
        },
      },
      key,
      receiver
    );
  };
};

export const createCollectionProxy = (target: object): any => {
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`);
    return target;
  }

  const targetType = targetTypeMap(toRawType(target));

  if (targetType === TargetType.INVALID) {
    return target;
  }

  return new Proxy(target, {
    // 访问代理对象属性时，必须设置getter
    // 对于代理的 Map Set WeekMap WeekSet 我们访问它的 get、set 方法时，都访问的是 proxy 对象上的属性
    // 所以必须设置 getter
    get: mutableInstrumentations(),
  });
};

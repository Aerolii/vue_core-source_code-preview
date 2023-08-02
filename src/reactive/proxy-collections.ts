// 集合代理

const collectionsGetter = function () {
  return (target: any, key: unknown, receiver: any) => {
    return Reflect.get(
      {
        get(this, k) {
          return target.get(k);
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

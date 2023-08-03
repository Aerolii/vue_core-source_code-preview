export type CollectionType = InterableCollections | WeakCollections;

type InterableCollections = Set<any> | Map<any, any>;
type WeakCollections = WeakSet<any> | WeakMap<any, any>;

const createCollectionHandlers = () => {
  return () => {};
};

export const mutableCollectionHandlers: ProxyHandler<CollectionType> = {
  get: createCollectionHandlers(),
};

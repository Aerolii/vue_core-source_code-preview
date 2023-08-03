// base handlers

const get = (target, key, receiver) => {};
const set = (target, key, value, receiver) => {
  return true;
};
const has = (target, key) => true;
const deleteProperty = (target, key) => true;
const ownKeys = (target) => [];

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  has,
  deleteProperty,
  ownKeys,
};

/*
 * @Author: zxb
 * @Date: 2023-08-01 11:12:46
 * @LastEditTime: 2023-08-01 12:46:46
 * @LastEditors: zxb
 * @Description: 研究为什么要在 proxy 中使用 reflect
 * @FilePath: /vue-source-code-review/src/research/proxy-reflect.ts
 * @see {@link https://juejin.cn/post/7080916820353351688}
 */

/**
 * 为什么要在 proxy 中使用 reflect
 */

/**
 * Proxy 对象用于创建一个对象的代理对象，从而实现基本操作的拦截和定义
 *
 * 如：属性查找、赋值、枚举、函数调用等
 *
 * @param target 要使用 `proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组、函数、甚至另一个代理
 * @param handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理对象的行为
 *
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy}
 */

// 基本用法

const obj = {
  name: 'jack',
};

const handler = {
  get(target: any, property: any, receiver: any) {
    console.log(receiver === proxy); // true
    console.log('this :>> ', this); // {get: ƒ}
    console.log('target :>> ', target); // {name: 'jack'}
    console.log('receiver :>> ', receiver); // Proxy(Object){name: 'jack'}
    return target[property];
  },
};

const proxy = new Proxy(obj, handler);
obj.name; // 访问原始对象，并不会出发代理
proxy.name; // 访问代理对象

// 从上面的例子中，我们可以看出，Proxy 通过包装原始对象，创建一个新的代理对象，我们可以通过 handler 设置对这个代理对象的操作拦截。通过拦截操作行为，我们又可以访问或修改原始对象。

/**
 * 当我们操作代理对象时，由于处理器 handler 本身是一个以函数作为属性的对象，因此，其 this 指向 handler 本身。
 *
 * target 始终为被代理的原始对象
 *
 * receiver 为代理对象本身或继承代理对象的对象
 */

const snake = {
  name: 'snake',
  get move() {
    return 'move...';
  },
};

const p = new Proxy(snake, {
  get(target, key, receiver) {
    console.log(receiver === p); // 这里的 receiver 指向真正的执行上下文
    return (target as any)[key];
  },
});

const s = {
  name: 'snake2',
};

Object.setPrototypeOf(s, p);

s.move;

console.log('================>');
const o = {
  name: 'o',
  get value() {
    return this.name;
  },
};

const oProxy = new Proxy(o, {
  get(target, key, receiver) {
    console.log(receiver === oProxy);
    return target[key];
  },
});

const o1 = {
  name: 'jack',
};

Object.setPrototypeOf(o1, oProxy);

console.log(o1.value); // 'o'

/**
 * 从上面例子中，我们可以看出，在 Proxy 中，receiver 实际为当前真正进行操作的对象。
 * 当一个对象继承一个 Proxy 对象，我们对这个对象进行操作时，receiver 就是真正进行操作的对象
 */

// reflect

/**
 * Reflect
 *
 * Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法，这些方法与 Proxy 的方法相同。
 *
 * Reflect 不是一个函数对象，因此它是不可构造的。
 *
 * 与大多数全局对象不同，Reflect 并非一个构造函数，所以不能通过 new 运算符对其进行调用，或者将 Reflect 作为一个函数来调用。
 *
 * Reflect 所有的属性和方法都是静态的
 *
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect}
 */

// Relect 中的 receiver

/**
 * Reflect.get() 方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。
 *
 * Reflect.get(target, propertyKey[, receiver])
 *
 * @param target 需要取值的目标对象
 *
 * @param propertyKey 需要获取的值的键值
 *
 * @param receiver 如果 target 对象中指定了 getter，receiver 则为 getter 调用时的 this 值。
 *
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get}
 */

const r = {
  name: 'reflect',
  get value() {
    return this.name;
  },
};

const printR = Reflect.get(r, 'value');
console.log('printR :>> ', printR);

const r2 = {
  name: 'r2',
};

Object.setPrototypeOf(r2, r);

const printR2 = Reflect.get(r2, 'value');
console.log('printR2 :>> ', printR2); // printR2 :>>  r2

console.log(Reflect.get(r, 'value', r2)); // r2 修改this

console.log(r2.value); // 'r2' 返回正确的值

/**
 * #TIPS: 如果 target 对象中指定了 getter，receiver 则为 getter 调用时的 this 值
 *
 * 也就是说，Reflect 拦截对象操作时，可以修改 getter 中的 this 对象，receiver 就是那个真正操作的对象
 */

// 结合上面的例子，当我们一个对象继承了一个 proxy 对象，我们操作该对象时，如果在 proxy 的 handler 中直接通过 target 进行拦截操作，那么执行上下文将不再是当前操作对象，而是被代理的原始对象。这就与我们实际预期的行为不符合，因为我们无法真正根据当前实际调用对象进行拦截行为。

// 因此，我们需要使用 Reflect 来修改执行上下文，使执行上下文是真正的我们要操作的对象

const pr = {
  name: 'pr',
  get value() {
    return this.name;
  },
};

const pr_proxy = new Proxy(pr, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
});

const pr1 = { name: 'pr1' };

Object.setPrototypeOf(pr1, pr);

console.log(pr1.value); // pr1

// 综上所述，当我们在 target 中指定了 getter 或 setter, 那么，我们必须使用 Reflect 来正确访问执行上下文对象。

// proxy 拦截对象操作必须使用 reflect 对象的场景

const person = {
  name: 'person',

  get value() {
    console.log('property value : => ', this.name);
    return this.name;
  },

  getName() {
    console.log('method getName: =>', this.name);
  },
};

const personProxy = new Proxy(person, {
  get(target, key, receiver) {
    return target[key];
  },
});

personProxy.getName(); // person

const chinese = {
  name: 'chinese',
};

const s1 = Object.setPrototypeOf(chinese, person);

s1.getName(); // chinese

s1.value; // chinese

const s2 = Object.setPrototypeOf(chinese, personProxy);

s2.getName(); // chinese

const america = {
  name: 'america',
};

Object.setPrototypeOf(america, personProxy);

america.getName(); // america

// 方法内 this 指向正确的执行上下文

s1.value; // person
s2.value; // person
america.value; // person

// 从上面例子中，可以看出，如果一个对象只是继承了原始对象，访问该对象时，依然正确返回；
// 当这个对象又重新继承了原始对象的代理对象后，getter 内的 this 不再正确；
// 当一个对象继承了一个代理对象时，原始对象内 getter setter 当指向需要使用 Reflect 来修改

import exportDefault from './exportDefault';

const sfc = {
  setup() {
    return 'setup';
  },
};

const rennder = function () {
  return ['<div>Hello</div>', '<div>Hello</div>'];
};

export default exportDefault(sfc, [rennder]);

export default (obj: any, props: Array<any>) => {
  const target = obj;

  for (const key of props) {
    target[key] = obj;
  }

  return target;
};

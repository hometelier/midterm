export const reduce = (array, fn, initValue) => {
  let i = 0;
  let acc = initValue ?? ((i = 1), array[0]);
  for (; i < array.length; i += 1) {
    acc = fn(acc, array[i]);
  }

  return acc;
};

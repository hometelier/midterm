// export const keyPair = (arr, tot) => {};

export const keyPair = (arr, n) => {
  const val_idx = {}; // {key: index}
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    // console.log('🚀  val:', val, val_idx[val]);

    // if (val_idx[val]) return [val_idx[val], i];
    if (val in val_idx) return [val_idx[val], i];

    val_idx[n / val] ??= i;
    // val_idx[Math.max(n, val) / Math.min(n, val)] ??= i;
    // console.log('val_idx=', val, val_idx);
  }
};

// console.log('***', keyPair([1, 3, 4, 5], 12));
// console.log('***', keyPair([1, 3, 4, 5], 4));

class Collection {
  #arr;
  constructor(...args) {
    this.#arr = Array.isArray(args[0]) ? args[0] : args || [];
  }

  get _arr() {
    return this.#arr;
  }

  toString() {
    if (this.#isStack()) {
      return this.#arr.join(',');
    }

    return this.#arr.join();
  }

  #isStack() {
    return this.constructor.name === 'Stack';
  }

  // toArray() {
  //   return this._arr;
  // }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#arr.length; i += 1) yield this.#arr[i];
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  get peek() {
    return this._arr[0];
  }

  clear() {
    this.#arr.length = 0;
  }

  get size() {
    return this.#arr?.length ?? 0;
  }

  get isEmpty() {
    return !this.size;
  }

  toString() {
    return `[${this.#arr.toString()}]`;
  }
}

export class Stack extends Collection {
  push(v) {
    // super.getArr().push(v);
    super._arr.push(v);
    return this;
  }

  pop() {
    return this._arr.pop();
  }

  get peek() {
    return this._arr[this.size - 1];
  }

  get poll() {
    return this.pop();
  }

  *[Symbol.iterator]() {
    for (let i = this._arr.length - 1; i >= 0; i -= 1) yield this._arr[i];
  }
}

export class Queue extends Collection {
  enqueue(v) {
    super._arr.push(v);
    return this;
  }

  dequeue() {
    return this._arr.shift();
  }
}

export class ArrayList extends Collection {
  add(val, idx) {
    // console.log('now=', this._arr);
    this._arr.splice(idx ?? this._arr.length, 0, val);
    // console.log('after=', this._arr);
    return this;
  }

  remove(val) {
    return this._arr.splice(this.indexOf(val), 1);
  }

  indexOf(val) {
    return this._arr.indexOf(val);
  }

  set(idx, val) {
    this._arr[idx] = val;
  }

  get(val) {
    return this._arr[this.indexOf(val)];
  }

  contains(val) {
    return this._arr.includes(val);
  }

  toList() {
    return this.constructor.arrayToList(this._arr);
  }

  static listToArray(list) {
    const arr = [];
    let node = list;
    while (true) {
      arr.push(node.value);
      node = node?.rest;

      if (!node) break;
    }
    return arr;
  }
  static arrayToList(arr) {
    let node2 = { value: arr.at(-1) };
    for (let i = arr.length - 2; i >= 0; i -= 1) {
      node2 = { value: arr[i], rest: node2 };
    }
    return node2;
  }

  toArray() {
    return this._arr;
  }

  toString() {
    return ArrayList.arrayToList(this._arr);
  }
}

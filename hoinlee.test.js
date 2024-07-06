import assert from 'assert';
import {
  reduce,
  keyPair,
  ProxyEmp,
  Stack,
  Queue,
  ArrayList,
  cal,
  telfmt,
  searchByKoreanInitialSound,
} from './hoinlee/index.js';

console.log('Name is ');
console.log('Email is ');

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
let users1 = [Hong, Kim, Lee];

const hong = { id: 1, name: 'Hong', dept: 'HR' };
const kim = { id: 2, name: 'Kim', dept: 'Server' };
const lee = { id: 3, name: 'Lee', dept: 'Front' };
const park = { id: 4, name: 'Park', dept: 'HR' };
const ko = { id: 7, name: 'Ko', dept: 'Server' };
const loon = { id: 6, name: 'Loon', dept: 'Sales' };
const choi = { id: 5, name: 'Choi', dept: 'Front' };
const users = [hong, kim, lee, park, ko, loon, choi];

const a10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
assert.deepStrictEqual(
  reduce(a10, (acc, cur) => acc + cur, 0),
  a10.reduce((acc, cur) => acc + cur, 0)
);

assert.deepStrictEqual(
  reduce(users1, (acc, user) => acc + user.name),
  users1.reduce((acc, user) => acc + user.name)
);

assert.deepStrictEqual(
  reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur),
  120
);

assert.deepStrictEqual(keyPair([1, 3, 3, 4, 5], 12), [1, 3]);
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 15), [1, 3]);
assert.deepStrictEqual(keyPair([5, 4, 3, 1], 15), [0, 2]);
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 4), [0, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 450), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 6), [1, 3]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 14), [1, 5]);

const proxyHong = new ProxyEmp();
proxyHong.fullName = 'Kildong Hong';
assert.deepStrictEqual(proxyHong.fullName, 'Kildong HONG');
assert.deepStrictEqual(proxyHong.firstName, 'Kildong');
assert.deepStrictEqual(proxyHong.lastName, 'HONG');

proxyHong.fullName = 'LEE';
assert.deepStrictEqual(proxyHong.fullName, 'Kildong LEE');
assert.deepStrictEqual(proxyHong.firstName, 'Kildong');
assert.deepStrictEqual(proxyHong.lastName, 'LEE');

const arrOrg = [1, 2, 3, 4, 5];
const stack = new Stack([1]);
stack.push(2).push(3).push(4).push(5);
assert.deepStrictEqual([...stack], [5, 4, 3, 2, 1]);
stack.push(6).push(7);
assert.deepStrictEqual([...stack], [7, 6, 5, 4, 3, 2, 1]);
assert.strictEqual(stack.pop(), 7);
assert.strictEqual(stack.pop(), 6);
assert.deepStrictEqual([...stack], [5, 4, 3, 2, 1]);
assert.strictEqual(stack.peek, 5);
assert.strictEqual(stack.poll, 5);
assert.deepStrictEqual([...stack], [4, 3, 2, 1]);
assert.strictEqual(stack.size, 4);
const itStack = stack.iterator();
assert.deepStrictEqual(itStack.next(), { value: 4, done: false });
stack.clear();
assert.strictEqual(stack.isEmpty, true);
assert.strictEqual(stack.size, 0);

const queue = new Queue(1);
queue.enqueue(2).enqueue(3);
assert.deepStrictEqual([...queue], [1, 2, 3]);
queue.enqueue(4).enqueue(5);
assert.strictEqual(queue.toString(), '[1,2,3,4,5]');
assert.strictEqual(queue.dequeue(), 1);
assert.strictEqual(queue.dequeue(), 2);
assert.deepStrictEqual([...queue], [3, 4, 5]);
assert.deepStrictEqual(queue.peek, 3);

const itQueue = queue.iterator();
assert.deepStrictEqual(itQueue.next(), { value: 3, done: false });
queue.clear();
assert.deepStrictEqual(queue.size, 0);

const alist = new ArrayList([1, 2, 3, 4, 5]);
assert.deepStrictEqual(alist.toArray(), [1, 2, 3, 4, 5]);
alist.add(6).add(7);
assert.deepStrictEqual([...alist], [1, 2, 3, 4, 5, 6, 7]);
alist.remove(2);
assert.deepStrictEqual(alist.toArray(), [1, 3, 4, 5, 6, 7]);
assert.deepStrictEqual(alist.peek, 1);
assert.deepStrictEqual(alist.isEmpty, false);
alist.remove(4);
alist.remove(6);

const listIter = alist.iterator();
assert.deepStrictEqual(listIter.next(), { value: 1, done: false });
assert.deepStrictEqual(ArrayList.arrayToList(alist.toArray()), {
  value: 1,
  rest: {
    value: 3,
    rest: {
      value: 5,
      rest: { value: 7 },
    },
  },
});
assert.deepStrictEqual(
  ArrayList.listToArray(ArrayList.arrayToList(alist.toArray())),
  [1, 3, 5, 7]
);
alist.clear();
assert.deepStrictEqual(alist.size, 0);
assert.deepStrictEqual(alist.isEmpty, true);

Array.prototype.mapBy = function (k) {
  return this.map((a) => a[k]);
};
assert.deepStrictEqual(users.mapBy('id'), [1, 2, 3, 4, 7, 6, 5]);
assert.deepStrictEqual(users.mapBy('name'), [
  'Hong',
  'Kim',
  'Lee',
  'Park',
  'Ko',
  'Loon',
  'Choi',
]);

Array.prototype.groupBy = function (gfn) {
  const ret = {};
  for (const a of this) {
    const k = gfn(a);
    ret[k] ||= [];
    ret[k].push(a);
  }

  return ret;
};

assert.deepStrictEqual(
  users.groupBy(({ dept }) => dept),
  {
    HR: [
      { id: 1, name: 'Hong', dept: 'HR' },
      { id: 4, name: 'Park', dept: 'HR' },
    ],
    Server: [
      { id: 2, name: 'Kim', dept: 'Server' },
      { id: 7, name: 'Ko', dept: 'Server' },
    ],
    Front: [
      { id: 3, name: 'Lee', dept: 'Front' },
      { id: 5, name: 'Choi', dept: 'Front' },
    ],
    Sales: [{ id: 6, name: 'Loon', dept: 'Sales' }],
  }
);
assert.deepStrictEqual(
  users.groupBy(({ dept, id }) => `${dept}${id % 2}`),
  {
    HR1: [{ id: 1, name: 'Hong', dept: 'HR' }],
    Server0: [{ id: 2, name: 'Kim', dept: 'Server' }],
    Front1: [
      { id: 3, name: 'Lee', dept: 'Front' },
      { id: 5, name: 'Choi', dept: 'Front' },
    ],
    HR0: [{ id: 4, name: 'Park', dept: 'HR' }],
    Server1: [{ id: 7, name: 'Ko', dept: 'Server' }],
    Sales0: [{ id: 6, name: 'Loon', dept: 'Sales' }],
  }
);

assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');
assert.deepStrictEqual(telfmt('345678'), '34-5678');

const data = [
  '강원도 고성군',
  '고성군 토성면',
  '토성면 북면',
  '북면',
  '김1수',
  '동광초등학교',
  'ABC영어유치원',
  '맛있는 ABC초콜릿',
  '비밀번호486',
];

function searchInitSound(chosung) {
  return searchByKoreanInitialSound(data, chosung);
}

assert.deepStrictEqual(searchInitSound('ㄱㅇ'), ['강원도 고성군']);
assert.deepStrictEqual(searchInitSound('ㄱㅅㄱ'), [
  '강원도 고성군',
  '고성군 토성면',
]);
assert.deepStrictEqual(searchInitSound('ㅌㅅㅁ'), [
  '고성군 토성면',
  '토성면 북면',
]);
assert.deepStrictEqual(searchInitSound('ㅂㅁ'), [
  '토성면 북면',
  '북면',
  '비밀번호486',
]);
assert.deepStrictEqual(searchInitSound('ㅍㅁ'), []);
assert.deepStrictEqual(searchInitSound('ㄱ1ㅅ'), ['김1수']);

assert.deepStrictEqual(searchInitSound('ㅎㄱ'), ['동광초등학교']);
assert.deepStrictEqual(searchInitSound('ㅂㅎ486'), ['비밀번호486']);
assert.deepStrictEqual(searchInitSound('ABC'), [
  'ABC영어유치원',
  '맛있는 ABC초콜릿',
]);

console.log('\n\n======================\n');
cal('2024-2');
console.log('-'.repeat(21), '\n');
cal('2024-7');
console.log('-'.repeat(21), '\n');
cal('2024-9');

console.log('\n\n======================\n');

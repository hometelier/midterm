const WEEKS = '일월화수목금토';

export function cal(ym) {
  const [y, m] = ym.split('-').map(Number);
  // console.log('🚀  y:', y, m - 1);
  const d = new Date(y, m, 1);
  d.setDate(0);
  const lastDate = d.getDate();
  d.setDate(1);
  const startDay = d.getDay();
  // console.log('🚀  startDay:', startDay);
  // console.log('🚀  d:', d.toLocaleDateString(), lastDate, startDay);

  let ret = ' '.repeat(startDay * 3);
  // console.log('🚀  ret:', ret, '.');

  for (let i = 1; i <= lastDate; i += 1) {
    ret += i.toString().padStart(3, ' ');
    if ((startDay + i) % 7 === 0) {
      ret += '\n';
    }
  }

  console.log(`${m}월 ${y}`.padStart(21 / 2 + 4, ' '));
  console.log([...WEEKS].map(w => w.padStart(2, ' ')).join(''));
  console.log(ret);
}

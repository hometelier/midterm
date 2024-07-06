export function telfmt(tel) {
  const len = tel?.length ?? 0;
  if (len <= 8) return tel?.replace(/(\d{1,4})(\d{4})/, '$1-$2');

  const A = tel.startsWith('02') ? 2 : len >= 12 ? len - 8 : 3;
  const B = len - (A + 4);

  const regexp = new RegExp(`(\\d{${A}})(\\d{${B}})(\\d{4})`);
  return tel.replace(regexp, '$1-$2-$3');
}

const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const 가나다 = '가까나다따라마바빠사싸아자짜차카타파하';

const 힣 = '힣'.charCodeAt(0);

// ㄱㅇ
export function searchByKoreanInitialSound(data, first = '') {
  const r = [...first].reduce((acc, a) => {
    const idx = ㄱㄴㄷ.search(a);
    if (idx === -1) return a;
    const S = 가나다[idx];
    const E = (가나다[idx + 1]?.charCodeAt(0) || 힣 + 1) - 1;

    return `${acc}[${a}${S}-${String.fromCharCode(E)}]`;
  }, '');
  const regexp = new RegExp(r);
  return data.filter(a => regexp.test(a));
}

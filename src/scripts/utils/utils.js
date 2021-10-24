export function reduceString(str, maxLength = 100) {
  return str.length > maxLength ? `${str.substr(0, maxLength)}..` : str;
}

export function roundToPrecision(num, precision = 2) {
  return Math.round((num + Number.EPSILON) * 10 ** precision) / 10 ** precision;
}

export function formatNumber(x) {
  if (Number.isNaN(x)) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function padNumber(x, size) {
  let num = x.toString();
  while (num.length < size) num = `0${num}`;
  return num;
}

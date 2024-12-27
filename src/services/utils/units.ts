export function multiply1024(data: number, times: number = 1) {
  let r = data;
  for (let i = 0; i < times; i++) {
    r *= 1024;
  }
  return r;
}

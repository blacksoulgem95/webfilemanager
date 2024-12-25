export function join(os: string, ...path: string[]): string {

  let separator = '/'
  if (os.indexOf('win')) separator = `\\` // windows...

  if (path.length <= 1) return path.join('');
  let tmp = path;
  let first = tmp.shift()!, second = tmp.shift()!
  if (!first.endsWith(separator)) first += separator
  if (second.startsWith(separator)) {
    let sTmp = second.split('')
    sTmp.shift()
    second = sTmp.join('')
  }
  console.log('os, path, separator', os, path, separator)
  console.log('first, second', first, second)

  return join(os, ...[first + second, ...tmp])
}

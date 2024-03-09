export function chunk<T>(array: Array<T>, size: number): Array<Array<T>> {
  let index = 0;
  const result = [];
  while (index < array.length) {
    result.push(array.slice(index, index + size));
    index += size;
  }
  return result;
}

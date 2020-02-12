// @flow
export const createActionTypeCreator = (reducerName: string) => (
  type: string
) => `${reducerName}/${type}`;

export function chunk<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
  let res = [];
  let curr = [];
  for (let i = 0; i < arr.length; i++) {
    curr.push(arr[i]);
    if (curr.length === chunkSize) {
      res.push(curr);
      curr = [];
    }
  }

  if (curr.length) res.push(curr);
  return res;
}

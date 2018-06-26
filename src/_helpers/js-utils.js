// @flow
export function isDefined(v: any): boolean {
  return v !== null && v !== undefined;
}

// Backend currently doesn't accept standard ISO datetime nor a js date.
export function toScalaDate(date: Date): string {
  return date.toISOString().slice(0, -1);
}

export const createActionTypeCreator = (reducerName: string) => (
  type: string
) => `${reducerName}/${type}`;

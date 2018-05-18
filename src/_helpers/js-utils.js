export function isDefined(v) {
  return v !== null && v !== undefined;
}

// Backend currently doesn't accept standard ISO datetime nor a js date.
export function toScalaDate(date) {
  return date.toISOString().slice(0, -1);
}

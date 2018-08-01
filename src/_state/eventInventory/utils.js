// @flow
import type { EDInventoryRow } from '_models';

const createSorter = (prop, sortFunc) => {
  return (a, b) => sortFunc(a[prop], b[prop]);
};

const compareByCharacter = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

const compareByIntegerValue = (a, b) => Number(a) - Number(b);

// Characters are ranked higher than numbers. Doesn't handle mixed
// values. I.E. A1, A10, B1, B10
const alphaNumericSort = (a: string, b: string) => {
  if (isNaN(a) && isNaN(b)) {
    return compareByCharacter(a, b);
  }

  if (!isNaN(a) && !isNaN(b)) {
    return compareByIntegerValue(a, b);
  }

  return isNaN(a) ? -1 : 1;
};

const sortFuncs = {
  priceScaleId: createSorter('priceScaleId', compareByIntegerValue),
  section: createSorter('section', alphaNumericSort),
  row: createSorter('row', compareByCharacter),
  seats: createSorter('seats', compareByIntegerValue),
  listedPrice: createSorter('listedPrice', compareByIntegerValue),
  isListed: createSorter('isListed', compareByIntegerValue)
};

export function calculateFilteredRows(
  rows: EDInventoryRow[],
  filterDirection: 'asc' | 'desc',
  filterName: string,
  selectedScaleFilters: any[] = []
) {
  let rowsFilteredByScale = rows;
  const hasScaleFilters = selectedScaleFilters.length;

  if (hasScaleFilters) {
    const scaleMap = selectedScaleFilters.reduce(
      (acc, v) => ({ ...acc, [v.integrationId]: true }),
      {}
    );
    rowsFilteredByScale = rows.filter((row) => scaleMap[row.priceScaleId]);
  }

  if (!filterName) return rowsFilteredByScale;

  let sorted: EDInventoryRow[] = [...rowsFilteredByScale].sort(
    sortFuncs[filterName]
  );

  if (filterDirection === 'desc') {
    sorted.reverse();
  }

  return sorted;
}

export function findUniqueKeys(prop: string, objArray: any[]): any[] {
  return objArray
    .map((o) => o[prop])
    .filter((val, idx, arr) => arr.indexOf(val) === idx);
}

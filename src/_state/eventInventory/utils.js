// @flow
import type { EDInventoryRow, EDVenuePriceScale } from '_models';
import { sortAlphaNum } from '_helpers';

export function calculateFilteredRows(
  rows: EDInventoryRow[],
  filterDirection: 'asc' | 'desc',
  filterName: string,
  selectedScaleFilters: any[] = [],
  scaleFilters: EDVenuePriceScale[]
) {
  let rowsFilteredByScale: EDInventoryRow[] = rows;
  const hasScaleFilters = selectedScaleFilters.length;

  if (hasScaleFilters) {
    const scaleMap = selectedScaleFilters.reduce(
      (acc, v) => ({ ...acc, [v.id]: true }),
      {}
    );
    rowsFilteredByScale = rows.filter(
      (row: EDInventoryRow) => scaleMap[row.priceScaleId]
    );
  }

  if (!filterName) return rowsFilteredByScale;

  let sorted: EDInventoryRow[];
  if (filterName === 'seats') {
    sorted = ([...rowsFilteredByScale].sort((a, b) =>
      sortAlphaNum(a[filterName].length, b[filterName].length)
    ): EDInventoryRow[]);
  } else if (filterName === 'priceScaleId') {
    sorted = ([...rowsFilteredByScale].sort((a, b) => {
      const { name: firstPriceScaleName } =
        scaleFilters.find((scale: EDVenuePriceScale) => {
          return scale.id === a[filterName];
        }) || {};

      const { name: secondPriceScaleName } =
        scaleFilters.find((scale: EDVenuePriceScale) => {
          return scale.id === b[filterName];
        }) || {};

      return sortAlphaNum(firstPriceScaleName, secondPriceScaleName);
    }): EDInventoryRow[]);
  } else {
    sorted = ([...rowsFilteredByScale].sort(
      (a: EDInventoryRow, b: EDInventoryRow) =>
        sortAlphaNum(a[filterName], b[filterName])
    ): EDInventoryRow[]);

    //Sort letters before numbers, for alphanumeric columns
    if (filterName === 'section' || filterName === 'row') {
      const charIndex = sorted.findIndex((row) => {
        return row[filterName].charAt(0).match(/[a-z]/i);
      });
      if (charIndex) {
        sorted = [
          ...sorted.slice(charIndex, sorted.length),
          ...sorted.slice(0, charIndex)
        ];
      }
    }
  }

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

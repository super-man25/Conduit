// @flow
import type {
  EDInventorySectionFilter,
  EDInventoryRow,
  EDVenuePriceScale,
  EDSectionsToPriceScale
} from '_models';
import type { State } from '.';
import { sortAlphaNum } from '_helpers';

export function calculateFilteredRows(
  rows: EDInventoryRow[],
  filterDirection: 'asc' | 'desc',
  filterName: string,
  scaleFilters: EDVenuePriceScale[],
  selectedSectionFilters: EDInventorySectionFilter[]
) {
  const hasSectionFilters = selectedSectionFilters.length;
  let rowsFilteredBySection: EDInventoryRow[] = rows;
  const sectionFilters = selectedSectionFilters.map((section) => section.name);
  if (hasSectionFilters) {
    rowsFilteredBySection = rows.filter((row) =>
      sectionFilters.includes(row.section)
    );
  }

  if (!filterName) return rowsFilteredBySection;

  let sorted: EDInventoryRow[];
  if (filterName === 'seats') {
    sorted = ([...rowsFilteredBySection].sort((a, b) =>
      sortAlphaNum(a[filterName].length, b[filterName].length)
    ): EDInventoryRow[]);
  } else if (filterName === 'priceScaleId') {
    sorted = ([...rowsFilteredBySection].sort((a, b) => {
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
    sorted = alphaFirstSort(rowsFilteredBySection, filterName);
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

export function findUniqueSections(eventInventory: EDInventoryRow[]) {
  const uniqueSections = findUniqueKeys('section', eventInventory).map(
    (section, index) => ({ id: index, name: section })
  );
  return alphaFirstSort(uniqueSections, 'name');
}

/**
 * Return an array of section filters applied
 *
 * @param {State} state - Event Invetory state
 * @param {EDVenuePriceScale[]} payload - array of price scale filters selected
 * @return {EDInventorySectionFilter[]}
 */
export function getSectionsByScaleFilter(
  state: State,
  payload: EDVenuePriceScale[]
) {
  const {
    selectedScaleFilters,
    selectedSectionFilters,
    sectionsToPriceScale,
    sectionFilters
  } = state;
  const selectedPriceScaleIds = payload.map((priceScale) => priceScale.id);

  //Get all sections that apply by price scales selected
  const sectionsByScale = sectionsToPriceScale
    .filter((e) => selectedPriceScaleIds.includes(e.priceScaleId))
    .reduce((acc, curr) => [...acc, ...curr.sections], []);
  if (payload.length > selectedScaleFilters.length) {
    //Scale Filter Added
    const sectionFiltersByScale = sectionFilters.filter((sectionFilter) =>
      sectionsByScale.includes(sectionFilter.name)
    );
    return [...selectedSectionFilters, ...sectionFiltersByScale];
  } else {
    //Scale Filter(s) Removed
    //Find scale filters removed
    const scaleFilterIdsRemoved = selectedScaleFilters
      .filter((e) => !payload.includes(e))
      .map((e) => e.id);

    //Find all sections that belong to price scales removed
    const sectionsRemovedByPriceScale = sectionsToPriceScale
      .filter((e) => scaleFilterIdsRemoved.includes(e.priceScaleId))
      .reduce((acc, curr) => [...acc, ...curr.sections], []);

    //Only remove sections that are not applied by another price scale currently selected
    const canRemoveSections = sectionsRemovedByPriceScale.filter(
      (section) => !sectionsByScale.includes(section)
    );
    //Return section filters that are 'canRemoveSections'
    return (selectedSectionFilters.filter(
      (sectionFilter) => !canRemoveSections.includes(sectionFilter.name)
    ): EDInventorySectionFilter[]);
  }
}

/**
 * Return an array of price scale filters applied
 *
 * @param {State} state - Event Invetory state
 * @param {EDInventorySectionFilter[]} payload - array of section filters selected
 * @return {EDVenuePriceScale[]}
 */
export function getScalesBySectionFilter(
  state: State,
  payload: EDInventorySectionFilter[]
) {
  const { selectedScaleFilters, sectionsToPriceScale } = state;
  //find current section filters applied
  const sectionFilters = payload.reduce((acc, curr) => {
    return [...acc, ...[curr.name]];
  }, []);
  //Return scale filters that are still applicable (those that have all section filters currently selected)
  return (selectedScaleFilters.filter((scaleFilter) => {
    const { sections = [] } =
      sectionsToPriceScale.find((e) => e.priceScaleId === scaleFilter.id) || {};
    return sections.every((section) => sectionFilters.includes(section));
  }): EDVenuePriceScale[]);
}

export function alphaFirstSort(rows: EDInventoryRow, sortBy: string) {
  let sorted = [...rows];
  sorted.sort((a, b) => sortAlphaNum(a[sortBy], b[sortBy]));
  const charIndex = sorted.findIndex((row) => {
    return row[sortBy].charAt(0).match(/[a-z]/i);
  });

  if (charIndex >= 0) {
    sorted = [
      ...sorted.slice(charIndex, sorted.length),
      ...sorted.slice(0, charIndex)
    ];
  }
  return sorted;
}

/**
 * Return an array of objectes mapping the Inventory Sections to the corresponding Price Scale Ids
 *
 * @param {EDInventoryRow[]} eventInventory - array of Event Inventory
 * @return {EDSectionsToPriceScale[]}
 */
export function mapSectionsToPriceScales(
  eventInventory: EDInventoryRow[]
): EDSectionsToPriceScale[] {
  return eventInventory.reduce(
    (acc: EDSectionsToPriceScale[], cur: EDInventoryRow) => {
      const priceScaleSections = acc.find(
        (e) => e.priceScaleId === cur.priceScaleId
      );
      if (!priceScaleSections) {
        //add new price scale with section
        return acc.concat([
          { priceScaleId: cur.priceScaleId, sections: [cur.section] }
        ]);
      } else if (!priceScaleSections.sections.includes(cur.section)) {
        //add section to corresponding price scale sections
        priceScaleSections.sections = priceScaleSections.sections.concat([
          cur.section
        ]);
      }
      return acc;
    },
    []
  );
}

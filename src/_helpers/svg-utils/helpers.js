export function appendSVGElement(el, tagname, properties) {
  // console.log(el);
  const newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tagname
  );
  Object.assign(newElement, properties);
  el.appendChild(newElement);
}

export function findElementsBySelectedSectionFilters(elements, sectionFilters) {
  const sectionFilterIds = sectionFilters.map((f) => f.name);
  const matchingEls = elements.filter((el) =>
    sectionFilterIds.includes(el.sectionRef)
  );

  return matchingEls;
}

export function findElementsNotSelected(elements, sectionFilters) {
  const sectionFilterIds = sectionFilters.map((f) => f.name);
  if (sectionFilterIds.length) {
    return elements.filter((el) => !sectionFilterIds.includes(el.sectionRef));
  }

  return [];
}

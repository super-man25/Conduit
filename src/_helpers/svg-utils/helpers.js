export function appendSVGElement(el, tagname, properties) {
  // console.log(el);
  const newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tagname
  );
  Object.assign(newElement, properties);
  el.appendChild(newElement);
}

export function findElementsInMapping(el, elements, mapping) {
  const elMapping = mapping.find((item) => item.sectionRef === el.sectionRef);
  if (!elMapping) return [];

  const allPriceScales = mapping.filter(
    (item) => item.priceScaleId === elMapping.priceScaleId
  );

  const allMatchingEls = allPriceScales
    .map((item) => elements.find((el) => el.sectionRef === item.sectionRef))
    .filter(Boolean);

  return allMatchingEls;
}

export function findElementsBySelectedScaleFilters(
  elements,
  mapping,
  scaleFilters
) {
  const priceScaleIds = scaleFilters.map((s) => s.id);

  const mappingWithMatchingPriceScaleIds = mapping.filter((m) =>
    priceScaleIds.includes(m.priceScaleId)
  );

  const matchingEls = mappingWithMatchingPriceScaleIds
    .map((m) => elements.find((el) => el.sectionRef === m.sectionRef))
    .filter(Boolean);

  return matchingEls;
}

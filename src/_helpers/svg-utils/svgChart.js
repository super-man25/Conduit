import { SVGChartElement } from './svgChartElement';
import {
  findElementsBySelectedSectionFilters,
  findElementsNotSelected
} from './helpers';

/**
 * SVGChart - Chart that manages the seatmap SVG's in event dynamic
 *
 * svgRoot - the root svg element to control
 * mapping - svg mapping fetched from the API
 * options - Object with the following options
 * {
 *    onInit: (chartInstance, svgChartElements, mapping) => void,
 *    onMouseover: (clickedElement, elementsInMapping, allElements, mapping) => void
 *    onMouseout: (clickedElement, elementsInMapping, allElements, mapping) => void,
 *    onClick: (clickedElement, elementsInMapping, allElements, mapping) => void,
 *    clickable: boolean
 * }
 */
export class SVGChart {
  constructor(svgRoot, mapping, options) {
    const elements = Array.from(svgRoot.querySelectorAll('[data-section-ref]'));
    const { allSectionFilters } = options;

    this.mapping = mapping;
    this.elements = elements.map(
      (el) =>
        new SVGChartElement(
          el,
          allSectionFilters.find(
            (f) => f.name.toLowerCase() === el.dataset.sectionRef.toLowerCase()
          )
        )
    );

    Object.assign(this, options);

    this.init();
  }

  init() {
    this.addListeners();
    if (this.onInit) this.onInit(this, this.elements, this.mapping);
  }

  destroy() {
    this.removeListeners();
  }

  getElements() {
    return this.elements;
  }

  addListeners() {
    const { elements } = this;
    elements.forEach((el) => {
      el.addListener('mouseover', (event) =>
        this.elementMouseoverCallback(el, event)
      );
      el.addListener('mouseout', (event) =>
        this.elementMouseoutCallback(el, event)
      );
      el.addListener('click', (event) =>
        this.elementClickedCallback(el, event)
      );
    });
  }

  removeListeners() {
    const { elements } = this;
    elements.forEach((el) => el.removeListeners());
  }

  elementMouseoverCallback = (el) => {
    const { elements, clickable } = this;
    const { associatedMapping } = el;

    if (!clickable || !associatedMapping) return;

    el.highlight();

    if (this.onMouseover) this.onMouseover(el, elements);

    this.updateChartElements();
  };

  elementMouseoutCallback = (el) => {
    const { elements, clickable } = this;

    if (!clickable) return;

    el.unhighlight();

    if (this.onMouseout) this.onMouseout(el, elements);

    this.updateChartElements();
  };

  elementClickedCallback = (el, event) => {
    const { elements, clickable } = this;

    if (!clickable) return;

    if (this.onClick) this.onClick(el, elements);

    this.updateChartElements();
  };

  highlightSelectedSectionFilters(sectionFilters) {
    const { elements } = this;

    const elementsToHighlight = findElementsBySelectedSectionFilters(
      elements,
      sectionFilters
    );

    const elementsToFade = findElementsNotSelected(elements, sectionFilters);

    elements.forEach((el) => el.unselect());
    elements.forEach((el) => el.unfade());

    elementsToHighlight.forEach((el) => el.select());
    elementsToFade.forEach((el) => el.fade());

    this.updateChartElements();
  }

  updateChartElements() {
    const { elements } = this;
    elements.forEach((el) => el.render());
  }
}

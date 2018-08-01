import { SVGChartElement } from './svgChartElement';
import {
  findElementsInMapping,
  findElementsBySelectedScaleFilters
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
 *    onClick: (clickedElement, elementsInMapping, allElements, mapping) => void
 * }
 */
export class SVGChart {
  constructor(svgRoot, mapping, options) {
    const elements = Array.from(svgRoot.querySelectorAll('[data-section-ref]'));

    this.mapping = mapping;
    this.elements = elements.map(
      (el) =>
        new SVGChartElement(
          el,
          mapping.find((m) => m.sectionRef === el.dataset.sectionRef)
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
    const { elements, mapping } = this;
    const elementsInMapping = findElementsInMapping(el, elements, mapping);
    elementsInMapping.forEach((el) => el.highlight());
    if (this.onMouseover)
      this.onMouseover(el, elementsInMapping, elements, mapping);

    this.updateChartElements();
  };

  elementMouseoutCallback = (el) => {
    const { elements, mapping } = this;
    const elementsInMapping = findElementsInMapping(el, elements, mapping);
    elementsInMapping.forEach((el) => el.unhighlight());
    if (this.onMouseout)
      this.onMouseout(el, elementsInMapping, elements, mapping);

    this.updateChartElements();
  };

  elementClickedCallback = (el, event) => {
    const { elements, mapping } = this;
    const elementsInMapping = findElementsInMapping(el, elements, mapping);
    if (this.onClick) this.onClick(el, elementsInMapping, elements, mapping);

    this.updateChartElements();
  };

  highlightSelectedScaleFilters(scaleFilters) {
    const { mapping, elements } = this;

    const elementsToHighlight = findElementsBySelectedScaleFilters(
      elements,
      mapping,
      scaleFilters
    );

    elements.forEach((el) => el.unselect());
    elementsToHighlight.forEach((el) => el.select());

    this.updateChartElements();
  }

  updateChartElements() {
    const { elements } = this;
    elements.forEach((el) => el.render());
  }
}

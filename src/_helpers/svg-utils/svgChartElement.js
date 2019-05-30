import { cssConstants } from '_constants';

export class SVGChartElement {
  constructor(svgElement, associatedMapping) {
    this.element = svgElement;
    this.originalFill = cssConstants.SECONDARY_BLUE_GRAY;
    this.selectedFill = cssConstants.SECONDARY_BLUE;
    this.highlightFill = cssConstants.SECONDARY_LIGHTEST_BLUE;
    this.unavailableFill = cssConstants.PRIMARY_LIGHT_GRAY;
    this.associatedMapping = associatedMapping;
    this.sectionRef = svgElement.dataset.sectionRef;
    this.element.style.cursor = associatedMapping ? 'pointer' : null;

    this.selected = false;
    this.highlighted = false;
    this.listeners = {};
  }

  get id() {
    return this.element.dataset.sectionRef;
  }

  render() {
    const {
      associatedMapping,
      selected,
      highlighted,
      originalFill,
      selectedFill,
      highlightFill,
      unavailableFill,
      dirty
    } = this;

    if (!dirty) return;
    const color = !associatedMapping
      ? unavailableFill
      : selected
      ? selectedFill
      : highlighted
      ? highlightFill
      : originalFill;

    this.setFill(color);
    this.dirty = false;
  }

  select() {
    if (this.selected) {
      this.unselect();
      return;
    }

    this.selected = true;
    this.dirty = true;
  }

  unselect() {
    this.selected = false;
    this.dirty = true;
  }

  highlight() {
    this.highlighted = true;
    this.dirty = true;
  }

  unhighlight() {
    this.highlighted = false;
    this.dirty = true;
  }

  setFill(color) {
    this.element.setAttribute('fill', color);
  }

  addListener(type, callback) {
    if (this.listeners[type]) {
      this.element.removeEventListener(type, this.listeners[type]);
    }
    this.listeners[type] = callback;
    this.element.addEventListener(type, callback);
  }

  removeListeners() {
    Object.keys(this.listeners).forEach((type) =>
      this.element.removeEventListener(type, this.listeners[type])
    );
  }
}

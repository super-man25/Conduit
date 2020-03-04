import { colors } from '_constants';

export class SVGChartElement {
  constructor(svgElement, associatedMapping) {
    this.element = svgElement;
    this.customFill = svgElement.getAttribute('fill');
    this.originalFill = colors.blue_GRAY;
    this.selectedFill = colors.blue;
    this.highlightFill = colors.neonBlue;
    this.unavailableFill = colors.lightGray;
    this.associatedMapping = associatedMapping;
    this.sectionRef = svgElement.dataset.sectionRef;
    this.element.style.cursor = associatedMapping ? 'pointer' : 'not-allowed';

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
      customFill,
      selected,
      highlighted,
      originalFill,
      selectedFill,
      highlightFill,
      unavailableFill,
      dirty,
    } = this;

    if (!dirty) return;
    if (!customFill) {
      const activeHighlightFill = highlighted ? highlightFill : originalFill;
      const activeSelectedFill = selected ? selectedFill : activeHighlightFill;
      const color = !associatedMapping ? unavailableFill : activeSelectedFill;

      this.setFill(color);
    }
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

  fade() {
    this.element.setAttribute('opacity', '.5');
    this.dirty = true;
  }

  unfade() {
    this.element.setAttribute('opacity', '1');
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

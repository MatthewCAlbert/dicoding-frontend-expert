class AppSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._content = this.innerHTML;
    this._firstNoBg = this.getAttributeNames().includes('first-no-bg') || false;
    this._first = this.getAttributeNames().includes('first') || false;
    this._center = this.getAttributeNames().includes('center') || false;
    this._normalized = this.getAttribute('normalized') !== 'off';

    this.classList.add('section');
    this.setAttribute('role', 'region');
    if (this._first || this._firstNoBg) this.classList.add('section-first');
    if (this._normalized) this.classList.add('section-normalized');

    this.render();
  }

  afterRender() {
    if (this._center) this.querySelector('.section-inner').classList.add('justify-content-center', 'align-items-center', 'd-flex', 'flex-column');
  }

  render() {
    this.innerHTML = `
      ${this._firstNoBg ? '<div class="section-first-padder"></div>' : ''}
      <div class="section-inner">
        ${this._content}
      </div>
    `;

    this.afterRender();
  }
}

customElements.define('app-section', AppSection);

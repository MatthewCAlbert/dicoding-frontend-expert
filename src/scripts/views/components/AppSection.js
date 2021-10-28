class AppSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._content = this.innerHTML;
    this._first = this.getAttributeNames().includes('first') || false;
    this._normalized = this.getAttribute('normalized') !== 'off';

    this.classList.add('section');
    this.setAttribute('role', 'region');
    if (this._first) this.classList.add('section-first');
    if (this._normalized) this.classList.add('section-normalized');

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="section-inner">
        ${this._content}
      </div>
    `;
  }
}

customElements.define('app-section', AppSection);

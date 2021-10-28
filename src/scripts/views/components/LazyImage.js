class LazyImage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._src = this.getAttribute('data-src');
    this._alt = this.getAttribute('alt');
    this._width = this.getAttribute('width');
    this._height = this.getAttribute('height');
    this._retry = 0;
    this.render();
  }

  _renderAttribute(name, prop) {
    return prop ? `${name}="${prop}"` : '';
  }

  render() {
    this.innerHTML = `
      <img src="${this._src}" alt="${this._alt}" ${this._renderAttribute('width', this._width)}  ${this._renderAttribute('height', this._height)}/>
    `;

    this._imgElement = this.querySelector('img');
    this._imgElement.addEventListener('error', (e) => {
      if (!this._imgElement.getAttribute('src')?.match('small') && this._retry < 1) {
        this._imgElement.src = this._imgElement.src.replace(/(medium)|(large)/i, 'small');
        this._retry++;
      }
    });
  }
}

customElements.define('lazy-image', LazyImage);

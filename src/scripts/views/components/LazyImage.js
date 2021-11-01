import { isExternalUrl } from '../../utils/utils';

class LazyImage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._src = this.getAttribute('data-src');
    this._alt = this.getAttribute('alt');
    this._width = this.getAttribute('width');
    this._height = this.getAttribute('height');
    this._noLazy = this.getAttributeNames().includes('no-lazy');
    this._isExternal = isExternalUrl(this._src);
    this._forceEnableResize = this.getAttributeNames().includes('force-resize') && !this._isExternal;

    this._sizeRegex = new RegExp(/(small)|(medium)|(large)/i);
    this._extRegex = new RegExp(/(jpg)|(jpeg)|(png)/i);

    this._resizeable = this._src.match(this._sizeRegex);
    this._webpPossible = this._src.match(this._extRegex);
    this.render();
  }

  _renderAttribute(name, prop) {
    return prop ? `${name}="${prop}"` : '';
  }

  _renderLazyImg(src) {
    if (!this._noLazy) return `<img loading="lazy" class="lazyload" src="/images/placeholder.png" data-src="${src}" alt="${this._alt}" ${this._renderAttribute('width', this._width)}  ${this._renderAttribute('height', this._height)}/>`;
    return `<img src="${src}" alt="${this._alt}" ${this._renderAttribute('width', this._width)}  ${this._renderAttribute('height', this._height)}/>`;
  }

  _renderResizable() {
    const smallSrc = this._src.replace(this._sizeRegex, 'small');

    return `
      ${this._webpPossible ? `<source type="image/webp" media="(max-width: 600px)" srcset="${smallSrc.replace(this._extRegex, 'webp')}" />` : ''}
      <source media="(max-width: 600px)" srcset="${smallSrc}" />

      ${this._renderLazyImg(this._src)}
    `;
  }

  _renderStatic() {
    if (this._forceEnableResize) {
      const ext = this._src.match(/(\.jpg)|(\.jpeg)|(\.png)/i)?.[0];
      return `
      <source type="image/webp" media="(max-width: 600px)" srcset="${this._src.replace(ext, '-small.webp')}" />
      <source media="(max-width: 600px)" srcset="${this._src.replace(ext, `-small${ext}`)}" />
      <source type="image/webp" srcset="${this._src.replace(ext, '-large.webp')}" />
      <source srcset="${this._src.replace(ext, `-large${ext}`)}" />
        ${this._renderLazyImg(this._src)}
      `;
    } return `
      ${this._webpPossible ? `<source type="image/webp" media="(max-width: 600px)" srcset="${this._src.replace(this._extRegex, 'webp')}" />` : ''}
      ${this._renderLazyImg(this._src)}
    `;
  }

  render() {
    this.innerHTML = `
      <picture>
        ${this._resizeable ? this._renderResizable() : this._renderStatic()}
      </picture>
    `;
  }
}

customElements.define('lazy-image', LazyImage);

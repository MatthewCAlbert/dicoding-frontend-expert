import { reduceString, roundToPrecision } from '../../utils/utils';

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._isLoading = (this.getAttributeNames().includes('loading') || this.getAttribute('loading') !== 'off') || false;
    this.style.width = '100%';
    this.style.height = '100%';
    this.render();
  }

  set loading(isLoading) {
    this._isLoading = isLoading;
    this.setAttribute('loading', isLoading ? 'on' : 'off');
  }

  render() {
    this.innerHTML = `
      <app-section class="loading-container" style="height:100%;">
        Ini lagi loading...
      </app-section>
    `;

    if (this._isLoading) {
      this.style.display = 'flex';
    } else {
      this.style.display = 'none';
    }
  }
}

customElements.define('loading-indicator', LoadingIndicator);

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.width = '100%';
    this.style.height = '100%';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div center class="loading-container">
        <div class="loader"></div>
        <div class="loading-container-title d-flex align-items-center">
          <span>Loading </span>
        </div>
        <p class="loading-container-caption">Getting your stuff ready.</p>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

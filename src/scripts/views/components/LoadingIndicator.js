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
      <app-section class="loading-container" style="height:100%;">
        Ini lagi loading...
      </app-section>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

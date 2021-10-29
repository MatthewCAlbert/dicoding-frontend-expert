class WarningIndicator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._status = this.innerHTML;
    this.style.width = '100%';
    this.style.height = '100%';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div center class="loading-container">
        <i class="fas fa-exclamation-triangle" style="font-size:4rem;margin:15px 0;color:#f07027;"></i>
        <div class="loading-container-title d-flex align-items-center">
          <span>${this?._status}</span>
        </div>
        <p class="loading-container-caption">Something went wrong.</p>
      </div>
    `;
  }
}

customElements.define('warning-indicator', WarningIndicator);

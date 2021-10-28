class WarningIndicator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._status = this.getAttribute('status');
    this.style.width = '100%';
    this.style.height = '100%';
    this.render();
  }

  render() {
    this.innerHTML = `
      <app-section class="warning-container" style="height:100%;">
      ${this._status}
      </app-section>
    `;
  }
}

customElements.define('warning-indicator', WarningIndicator);

class RestaurantContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._content = this.innerHTML;
    this._data = this._data || [];
    this.render();
  }

  set data(val) {
    this._data = val;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-items-container-result">
        <p>${this._data?.length} result found.</p>
      </div>
      <div class="restaurant-items-container">
        ${this._data
          ?.map(
            (el) => `
            <restaurant-card data-id="${el?.id}" title="${el?.name}" rating="${el?.rating}" img="${el?.pictureId}" location="${el?.city}">${el?.description}</restaurant-card>
          `
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("restaurant-container", RestaurantContainer);

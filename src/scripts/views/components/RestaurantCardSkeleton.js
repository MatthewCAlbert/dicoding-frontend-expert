class RestaurantCardSkeleton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-item-skeleton">
      </div>
    `;
  }
}

customElements.define('restaurant-card-skeleton', RestaurantCardSkeleton);

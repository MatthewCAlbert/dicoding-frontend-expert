import { reduceString, roundToPrecision } from '../../utils/utils';

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._description = this.innerHTML
      || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas reiciendis voluptas placeat inventore accusamus dolorem. Totam, alias voluptate voluptatibus, neque voluptatem cumque explicabo quidem commodi ipsa laborum laudantium, voluptas nam.';
    this._title = this.getAttribute('title') || 'Kafe Cemara';
    this._rating = parseFloat(this.getAttribute('rating')) || 5;
    this._location = this.getAttribute('location') || 'Jakarta';
    this._img = this.getAttribute('img')
      || 'https://cdn.idntimes.com/content-images/community/2019/11/people-in-cafeteria-2159065-378782f1354b8ddad7e09463bd52f0f8_600x400.jpg';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-item" tabindex="0">
          <div class="restaurant-item-head" style="background-image: url('${this._img}');">
              <div class="restaurant-item-label">${this._location}</div>
          </div>
          <div class="restaurant-item-content">
              <div class="d-flex align-items-center justify-content-between">
                  <p class="restaurant-item-title">${this._title}</p>
                  <div>
                      <i class="fas fa-star"></i>
                      <span>${roundToPrecision(this._rating, 1)}</span>
                  </div>
              </div>
              <div class="restaurant-item-description">
                  <p>${reduceString(this._description, 190)}</p>
              </div>
          </div>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);

import { reduceString, roundToPrecision } from '../../utils/utils';
import restaurantService from '../../services/restaurant.service';

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._description = this.innerHTML
      || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas reiciendis voluptas placeat inventore accusamus dolorem. Totam, alias voluptate voluptatibus, neque voluptatem cumque explicabo quidem commodi ipsa laborum laudantium, voluptas nam.';
    this._id = this.getAttribute('data-id');
    this._favorite = this.getAttributeNames().includes('favorite');
    this._noFav = this.getAttributeNames().includes('no-fav');
    this._title = this.getAttribute('title') || 'Kafe Cemara';
    this._rating = parseFloat(this.getAttribute('rating')) || 5;
    this._location = this.getAttribute('location') || 'Jakarta';
    this._img = restaurantService.cdn(this.getAttribute('img'), 'small')
      || 'https://cdn.idntimes.com/content-images/community/2019/11/people-in-cafeteria-2159065-378782f1354b8ddad7e09463bd52f0f8_600x400.jpg';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-item">
          <div class="restaurant-item-head">
              <div class="restaurant-item-label">${this._location}</div>
              <a href="/#/restaurant/${this._id}">
                <lazy-image class="mw-100" data-src="${this._img}" alt="${this._title}"></lazy-image>
              </a>
              ${!this._noFav ? `<favorite-button target-id="${this._id}" favorite="${this._favorite ? 1 : 0}"></favorite-button>` : ''}
          </div>
          <div class="restaurant-item-content">
              <div class="d-flex align-items-center justify-content-between">
                  <p class="restaurant-item-title" >${this._title}</p>
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

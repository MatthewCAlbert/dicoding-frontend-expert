import RestaurantModel from '../../data/restaurant.model';

class FavoriteButton extends HTMLElement {
  constructor() {
    super();
    this._isFavoriteSentence = ['ADD TO FAVORITE', 'REMOVE FROM FAVORITE'];
  }

  connectedCallback() {
    this._isFavorite = this.getAttribute('favorite') === '1' || false;
    this._restaurantId = this.getAttribute('target-id') || '';
    this._isLongVersion = this.getAttributeNames().includes('long') || false;
    this.render();
  }

  render() {
    this.innerHTML = !this._isLongVersion ? `
      <button aria-label="Toggle Favorite" class="btn restaurant-item-like-button"><i class="${this._isFavorite ? 'fas' : 'far'} fa-heart"></i></button>
    ` : `
      <button class="btn favorite-button ${this._isFavorite ? 'active' : ''}"><i class="${this._isFavorite ? 'fas' : 'far'} fa-heart"></i> <span>${this._isFavorite ? this._isFavoriteSentence?.[1] : this._isFavoriteSentence?.[0]}</span></button>
    `;

    this.querySelector('button').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (await RestaurantModel.setRestaurantFavoriteStatus(
        this._restaurantId, !this._isFavorite,
      )) {
        this._isFavorite = !this._isFavorite;
        const icon = this.querySelector('i');
        const button = this.querySelector('button');
        const text = this.querySelector('span');
        this.setAttribute('favorite', this._isFavorite ? 1 : 0);
        if (icon) {
          if (this._isFavorite) {
            icon.classList.remove('far');
            icon.classList.add('fas');
          } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
          }
        }
        if (text) {
          if (this._isFavorite) {
            button.classList.add('active');
            text.innerHTML = this._isFavoriteSentence?.[1];
          } else {
            button.classList.remove('active');
            text.innerHTML = this._isFavoriteSentence?.[0];
          }
        }
      }
    });
  }
}

customElements.define('favorite-button', FavoriteButton);

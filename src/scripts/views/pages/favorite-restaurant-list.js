import RestaurantModel from '../../data/restaurant.model';

const FavoriteRestaurantList = {
  async render() {
    return `
      <app-section first-no-bg>
        <h1 class="text-center mb-0">Your Favorites</h1>
        <p>No Favorites</p>
      </app-section>
    `;
  },
  
  async afterRender() {
  },
};

export default FavoriteRestaurantList;

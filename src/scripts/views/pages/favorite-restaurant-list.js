import RestaurantModel from '../../data/restaurant.model';

const FavoriteRestaurantList = {
  async render() {
    return `
      <app-section first-no-bg>
        <div class="d-flex flex-column align-items-center text-center">
          <h1 class="text-center mb-0">My Favorites</h1>
        </div>
        <div class="restaurant-items-container">
          <loading-indicator></loading-indicator>
        </div>
      </app-section>
    `;
  },
  
  async afterRender() {
    const restaurantList = await RestaurantModel.getAllFavoriteRestaurant();
    
    if (restaurantList?.length > 0) {
      document.querySelector('.restaurant-items-container').innerHTML = restaurantList?.map((el) => `
        <restaurant-card data-id="${el?.id}" title="${el?.name}" rating="${el?.rating}" img="${el?.pictureId}" location="${el?.city}" ${el?.favorite ? 'favorite' : ''} no-fav>${el?.description}</restaurant-card>
      `)?.join('');
    } else {
      document.querySelector('.restaurant-items-container').innerHTML = `
      <div class="text-center">
        <p>Oops, it seems you don't have any favorite restaurant yet.</p>
        <a href="/#" class="btn btn-primary">Find your Favorites</a>
      </div>
      `;
    }
  },
};

export default FavoriteRestaurantList;

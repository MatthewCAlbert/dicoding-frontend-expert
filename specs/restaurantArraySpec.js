import { itActsAsRestaurantModel } from './contract/restaurantContract';

let restaurantArray = [];

const RestaurantArray = {

  getRestaurant(id) {
    if (!id) {
      return;
    }

    return restaurantArray.find((restaurant) => restaurant.id === String(id));
  },

  getAllRestaurant() {
    return restaurantArray;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    let restaurantFinal = restaurant;
    const currentRestaurant = this.getRestaurant(restaurant.id);
    if (currentRestaurant) {
      restaurantFinal = { ...currentRestaurant, ...restaurant };
    }
    if (!restaurantFinal.hasOwnProperty('favorite')) {
      restaurantFinal = { ...restaurantFinal, favorite: false };
    }

    restaurantFinal = { ...restaurantFinal, id: String(restaurant.id) };

    this.removeRestaurant(String(restaurant.id));
    restaurantArray.push(restaurantFinal);
  },

  removeRestaurant(id) {
    restaurantArray = restaurantArray.filter((restaurant) => restaurant.id !== String(id));
  },

  searchRestaurant(query) {
    return this.getAllRestaurant()
      .filter((restaurant) => {
        const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
  
        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
  
        return jammedRestaurantName.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Restaurant Array Contract Test Implementation', () => {
  afterEach(() => restaurantArray = []);

  itActsAsRestaurantModel(RestaurantArray);
});

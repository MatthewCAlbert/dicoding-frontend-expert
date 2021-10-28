import { openDB } from 'idb';

const OBJECT_STORE_NAME = 'restaurant';

const dbPromise = openDB('restaurant-db', 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const RestaurantModel = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async addFavoriteRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async removeRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async getAllFavoriteRestaurant() {
    return (await this.getAllRestaurant()).filter((restaurant) => restaurant?.favorite);
  },
  async searchRestaurant(query) {
    return (await this.getAllRestaurant()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

export default RestaurantModel;

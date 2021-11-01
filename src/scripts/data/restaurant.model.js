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

    return (await dbPromise).get(OBJECT_STORE_NAME, String(id));
  },
  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    let restaurantFinal = restaurant;
    const currentRestaurant = await this.getRestaurant(restaurant.id);
    if (currentRestaurant) {
      restaurantFinal = { ...currentRestaurant, ...restaurant };
    }
    if (!restaurantFinal.hasOwnProperty('favorite')) {
      restaurantFinal = { ...restaurantFinal, favorite: false };
    }

    restaurantFinal = { ...restaurantFinal, id: String(restaurant.id) };
    
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurantFinal);
  },
  async removeRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, String(id));
  },
  async resetAll() {
    return (await this.getAllRestaurant()).forEach(async (restaurant) => {
      await this.removeRestaurant(restaurant.id);
    });
  },
  async getAllFavoriteRestaurant() {
    return (await this.getAllRestaurant()).filter((restaurant) => restaurant?.favorite);
  },
  async setRestaurantFavoriteStatus(id, isFavorited) {
    const restaurant = await this.getRestaurant(String(id));
    if (restaurant) {
      return (await dbPromise).put(OBJECT_STORE_NAME, {
        ...restaurant, 
        favorite: Boolean(isFavorited), 
      }); 
    }
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

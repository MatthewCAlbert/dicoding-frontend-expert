import { itActsAsRestaurantModel } from './contract/restaurantContract';
import RestaurantModel from '../src/scripts/data/restaurant.model';

describe('Restaurant Model Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await RestaurantModel.getAllRestaurant()).forEach(async (restaurant) => {
      await RestaurantModel.removeRestaurant(restaurant.id);
    });
  });

  itActsAsRestaurantModel(RestaurantModel);
});

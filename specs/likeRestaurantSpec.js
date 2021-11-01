import RestaurantModel from '../src/scripts/data/restaurant.model';
import * as TestFactories from './helpers/testFactories';
import { delay } from './helpers/utils';

describe('Liking A Restaurant', () => {
  beforeAll(async () => {
    await RestaurantModel.resetAll();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    expect(document.querySelector('[favorite="0"]'))
      .toBeTruthy();
  });

  it('should be able to like the restaurant', async () => {
    await RestaurantModel.putRestaurant({ id: 1 });
    const button = await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    document.querySelector(button).dispatchEvent(new Event('click'));

    await delay(50);

    expect(document.querySelector('[favorite="1"]'))
      .toBeTruthy();

    const likedMovie = await RestaurantModel.getRestaurant(1);
    expect(likedMovie).toEqual({ id: '1', favorite: true });

    await RestaurantModel.removeRestaurant(1);
  });

  it('should not like a restaurant when it has no id', async () => {
    const button = await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    document.querySelector(button).dispatchEvent(new Event('click'));

    expect(await RestaurantModel.getAllRestaurant()).toEqual([]);
  });

  it('should not like a restaurant when restaurant not exist', async () => {
    const button = await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    document.querySelector(button).dispatchEvent(new Event('click'));

    const movie = await RestaurantModel.getRestaurant(1);
    expect(movie).toBeFalsy();
  });
});
